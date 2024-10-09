import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain';
import {
  ConfigurationService,
  HealthService,
  PhysiciansService,
} from 'src/common/services';
import { CachingModule } from './caching.module';
import { DatabaseModule } from './database.module';
import { ConfigurationModule } from './configuration.module';
import { HealthCheckModule } from './health-check.module';

@Module({
  imports: [
    DomainModule,
    CachingModule,
    DatabaseModule,
    ConfigurationModule,
    HealthCheckModule,
  ],
  providers: [ConfigurationService, HealthService, PhysiciansService],
  exports: [ConfigurationService, HealthService, PhysiciansService],
})
export class ServicesModule {}
