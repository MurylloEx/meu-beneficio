import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import {
  S4eConnectorDomainService,
  S4eDomainService,
} from 'src/domain/business/slices/s4e';
import { ConfigurationDomainModule, ConfigurationDomainService } from 'src/domain/config';

const S4eHttpModuleAsync = HttpModule.registerAsync({
  imports: [ConfigurationDomainModule],
  useFactory: (configService: ConfigurationDomainService) =>
    configService.configureS4eHttpModule(),
  inject: [ConfigurationDomainService],
});

@Module({
  imports: [S4eHttpModuleAsync],
  providers: [S4eDomainService, S4eConnectorDomainService],
  exports: [S4eDomainService],
})
export class S4eModule {}
