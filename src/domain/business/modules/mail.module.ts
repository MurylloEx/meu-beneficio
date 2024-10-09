import { Module, Provider } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';

import { MailDomainService } from 'src/domain/business/slices/mail';
import { ConfigurationDomainModule, ConfigurationDomainService } from 'src/domain/config';

const SendgridProvider: Provider<MailService> = {
  provide: MailService,
  useFactory: (configService: ConfigurationDomainService) =>
    configService.configureSendgridMail(),
  inject: [ConfigurationDomainService],
};

@Module({
  imports: [ConfigurationDomainModule],
  providers: [MailDomainService, SendgridProvider],
  exports: [MailDomainService],
})
export class MailModule {}
