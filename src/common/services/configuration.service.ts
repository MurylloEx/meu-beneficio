import helmet from 'helmet';
import { json } from 'express';
import { register } from 'ts-node';
import { Sequelize } from 'sequelize';
import compression from 'compression';
import { StoreConfig } from 'cache-manager';
import { Reflector } from '@nestjs/core';
import { JwtModuleOptions } from '@nestjs/jwt';
import { SequelizeStorage, Umzug } from 'umzug';
import { CacheModuleOptions } from '@nestjs/cache-manager';
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import {
  ClassSerializerInterceptor,
  PipeTransform,
  ValidationPipe,
  ExceptionFilter,
  NestInterceptor,
  INestApplication,
  Injectable,
  Logger,
  VersioningOptions,
  VersioningType,
  VERSION_NEUTRAL,
} from '@nestjs/common';

import {
  CriticalErrorFilter,
  HttpExceptionFilter,
  DomainExceptionFilter,
} from 'src/common/filters';

import {
  ResponseInterceptor,
  TimeoutInterceptor,
  VersionInterceptor,
} from 'src/common/interceptors';

import { ConfigurationDomainService, DatabaseConfigSlice } from 'src/domain';

@Injectable()
export class ConfigurationService {
  constructor(
    private readonly reflector: Reflector,
    private readonly configurationDomainService: ConfigurationDomainService,
  ) {}

  getConfigurations() {
    return {
      app: this.configurationDomainService.app,
      cache: this.configurationDomainService.cache,
      compression: this.configurationDomainService.compression,
      database: this.configurationDomainService.database,
      oas: this.configurationDomainService.oas,
      root: this.configurationDomainService.root,
      security: this.configurationDomainService.security,
      server: this.configurationDomainService.server,
      aws: this.configurationDomainService.aws,
      s4e: this.configurationDomainService.s4e,
      sendgrid: this.configurationDomainService.sendgrid,
    };
  }

  configureServerGlobalPrefix(): string {
    return this.getConfigurations().server.globalPrefix;
  }

  configureServerPort(): number {
    return this.getConfigurations().server.port;
  }

  configureCompression() {
    const configs = this.getConfigurations();
    return {
      level: configs.compression.level,
      memLevel: configs.compression.memoryLevel,
    };
  }

  configureJwt(): JwtModuleOptions {
    const configs = this.getConfigurations();
    return {
      secret: configs.security.jwt.symmetricKey,
      signOptions: {
        issuer: configs.security.jwt.issuer,
        expiresIn: configs.security.jwt.expiration,
        algorithm: 'HS384',
      },
    };
  }

  configureCors() {
    const configs = this.getConfigurations();
    return {
      origin: configs.security.cors.origin,
      maxAge: configs.security.cors.maxAge,
    };
  }

  configureVersioning(): VersioningOptions {
    return {
      type: VersioningType.URI,
      defaultVersion: VERSION_NEUTRAL,
    };
  }

  configureCache(): Partial<CacheModuleOptions<StoreConfig>> {
    const configs = this.getConfigurations();
    return {
      ttl: configs.cache.ttl,
      max: configs.cache.max,
    };
  }

  configureGlobalPipes(): PipeTransform[] {
    return [
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    ];
  }

  configureGlobalFilters(): ExceptionFilter[] {
    return [
      new CriticalErrorFilter(this.reflector),
      new HttpExceptionFilter(this.reflector),
      new DomainExceptionFilter(this.reflector),
    ];
  }

  configureGlobalInterceptors(): NestInterceptor[] {
    return [
      new ResponseInterceptor(this.reflector),
      new TimeoutInterceptor(this.reflector),
      new VersionInterceptor(this, this.reflector),
      new ClassSerializerInterceptor(this.reflector, {
        strategy: 'excludeAll',
      }),
    ];
  }

  configureMiddlewares(): Function[] {
    return [helmet(), json({ limit: '10mb' }), compression(this.configureCompression())];
  }

  configureSwagger<TServer>(api: INestApplication<TServer>) {
    const configs = this.getConfigurations();
    const oasProject = new DocumentBuilder()
      .addSecurity('Authorization', {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        name: 'authorization',
        description: 'The bearer token in JWT format.',
      })
      .addGlobalParameters({
        name: 'X-App-Version',
        in: 'header',
        description: 'The current app version. Reference: https://semver.org/',
        example: '0.0.0',
        required: false,
      })
      .addSecurityRequirements('Authorization', ['authorization'])
      .setTitle(configs.oas.title)
      .setDescription(configs.oas.description)
      .setVersion(configs.oas.version)
      .setLicense(configs.oas.license.name, configs.oas.license.website)
      .setContact(
        configs.oas.contact.author.name,
        configs.oas.contact.author.website,
        configs.oas.contact.author.email,
      )
      .setExternalDoc('Download swagger.json', 'swagger.json')
      .build();

    const document = SwaggerModule.createDocument(api, oasProject);
    SwaggerModule.setup(configs.oas.path, api, document, {
      jsonDocumentUrl: 'swagger.json',
      yamlDocumentUrl: 'swagger.yaml',
    });
  }

  configureDatabase(): SequelizeModuleOptions {
    const configs = this.getConfigurations();
    const logger = new Logger('Postgres');

    return {
      dialect: 'postgres',
      host: configs.database.host,
      port: configs.database.port,
      database: configs.database.name,
      username: configs.database.username,
      password: configs.database.password,
      synchronize: configs.database.synchronize,
      autoLoadModels: configs.database.autoLoadModels,
      timezone: configs.database.timezone,
      logging: (log) => logger.debug(log),
      define: {
        paranoid: true,
        timestamps: true,
        collate: 'utf8mb4_general_ci',
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        deletedAt: 'deletedAt',
      },
    };
  }

  configureMigrationsAndSeeders() {
    const sequelize = new Sequelize(this.configureDatabase());
    const migrations = this.configureMigrations(sequelize);
    const seeders = this.configureSeeders(sequelize);
    const configs = this.getConfigurations();
    const database = configs.database;

    // Allow the use of TypeScript in Migrations/Seeders.
    register();

    const executor = (key: keyof DatabaseConfigSlice, routine: Function) => {
      return database[key] ? Promise.resolve(routine()) : Promise.resolve();
    };

    Promise.resolve()
      .then(() => executor('alwaysMigrate', () => migrations.up()))
      .then(() => executor('alwaysSeed', () => seeders.up()))
      .then(() =>
        executor('revertMigrationsTo', () =>
          migrations.down({ to: database.revertMigrationsTo }),
        ),
      )
      .then(() =>
        executor('revertSeedsTo', () => seeders.down({ to: database.revertSeedsTo })),
      );
  }

  configureMigrations(sequelize: Sequelize) {
    return new Umzug({
      logger: undefined,
      context: sequelize,
      storage: new SequelizeStorage({
        sequelize,
        modelName: 'migrations_meta',
      }),
      migrations: {
        glob: ['src/database/migrations/*.ts', { cwd: process.cwd() }],
      },
    });
  }

  configureSeeders(sequelize: Sequelize) {
    return new Umzug({
      logger: undefined,
      context: sequelize,
      storage: new SequelizeStorage({
        sequelize,
        modelName: 'seeders_meta',
      }),
      migrations: {
        glob: ['src/database/seeders/*.ts', { cwd: process.cwd() }],
      },
    });
  }

  configureApi<TServer>(api: INestApplication<TServer>): INestApplication<TServer> {
    api.enableShutdownHooks();
    api.enableCors(this.configureCors());
    api.enableVersioning(this.configureVersioning());
    api.setGlobalPrefix(this.configureServerGlobalPrefix());
    api.use(...this.configureMiddlewares());
    api.useGlobalPipes(...this.configureGlobalPipes());
    api.useGlobalFilters(...this.configureGlobalFilters());
    api.useGlobalInterceptors(...this.configureGlobalInterceptors());

    this.configureMigrationsAndSeeders();
    this.configureSwagger<TServer>(api);

    return api;
  }
}
