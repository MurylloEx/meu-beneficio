import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Application } from 'express';
import { ApiModule } from 'src/api';
import { ConfigurationService } from 'src/common';

async function bootstrap() {
  const api = await NestFactory.create<INestApplication<Application>>(ApiModule);
  const configService = api.get(ConfigurationService);
  const configuredApi = configService.configureApi(api);
  await configuredApi.listen(configService.configureServerPort());
}

bootstrap();
