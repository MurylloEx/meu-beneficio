import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigurationService } from 'src/common/services';
import { ConfigurationModule } from './configuration.module';

const SequelizeModuleAsync = SequelizeModule.forRootAsync({
  imports: [ConfigurationModule],
  useFactory: (configService: ConfigurationService) => configService.configureDatabase(),
  inject: [ConfigurationService],
});

@Module({
  imports: [SequelizeModuleAsync],
  exports: [SequelizeModuleAsync],
})
export class DatabaseModule {}
