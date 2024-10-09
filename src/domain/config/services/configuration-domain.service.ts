import { HttpModuleOptions } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';

import {
  AppConfig,
  CacheConfig,
  CompressionConfig,
  DatabaseConfig,
  OasConfig,
  RootConfig,
  SecurityConfig,
  ServerConfig,
  AwsConfig,
  S4eConfig,
  SendgridConfig,
} from 'src/domain/config/slices';

import {
  AppConfigType,
  CacheConfigType,
  CompressionConfigType,
  DatabaseConfigType,
  RootConfigType,
  OasConfigType,
  SecurityConfigType,
  ServerConfigType,
  AwsConfigType,
  S4eConfigType,
  SendgridConfigType,
} from 'src/domain/config/slices';

@Injectable()
export class ConfigurationDomainService {
  constructor(
    @Inject(AppConfig.KEY)
    public readonly app: AppConfigType,
    @Inject(CacheConfig.KEY)
    public readonly cache: CacheConfigType,
    @Inject(CompressionConfig.KEY)
    public readonly compression: CompressionConfigType,
    @Inject(DatabaseConfig.KEY)
    public readonly database: DatabaseConfigType,
    @Inject(OasConfig.KEY)
    public readonly oas: OasConfigType,
    @Inject(RootConfig.KEY)
    public readonly root: RootConfigType,
    @Inject(SecurityConfig.KEY)
    public readonly security: SecurityConfigType,
    @Inject(ServerConfig.KEY)
    public readonly server: ServerConfigType,
    @Inject(AwsConfig.KEY)
    public readonly aws: AwsConfigType,
    @Inject(S4eConfig.KEY)
    public readonly s4e: S4eConfigType,
    @Inject(SendgridConfig.KEY)
    public readonly sendgrid: SendgridConfigType,
  ) {}

  configureS4eHttpModule(): HttpModuleOptions {
    return {
      baseURL: this.s4e.apiUrl,
      headers: {
        Authorization: `api-key ${this.s4e.apiKey}`,
      },
    };
  }

  configureSendgridMail(): MailService {
    const instance = new MailService();
    instance.setApiKey(this.sendgrid.apiKey);
    return instance;
  }
}
