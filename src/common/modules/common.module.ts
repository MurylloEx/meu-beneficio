import { Module } from '@nestjs/common';
import { DomainModule } from 'src/domain';
import { CachingModule } from './caching.module';
import { DatabaseModule } from './database.module';
import { SecurityModule } from './security.module';
import { ServicesModule } from './services.module';

@Module({
  imports: [DomainModule, CachingModule, DatabaseModule, ServicesModule, SecurityModule],
  exports: [DomainModule, CachingModule, DatabaseModule, ServicesModule, SecurityModule],
})
export class CommonModule {}
