import { Injectable } from '@nestjs/common';
import { MailService } from '@sendgrid/mail';
import { ConfigurationDomainService } from 'src/domain/config';
import { WelcomeMailTemplate } from 'src/domain/business/slices/mail/mails';
import {
  MailNotSentDomainException,
  MailUnsupportedSendBatchOperationDomainException,
} from 'src/domain/business/slices/mail/exceptions';
import { PixMailTemplate } from '../mails/pix.mail';

@Injectable()
export class MailDomainService {
  constructor(
    private readonly sendgridService: MailService,
    private readonly configService: ConfigurationDomainService,
  ) {}

  async sendBatch(): Promise<void> {
    throw new MailUnsupportedSendBatchOperationDomainException();
  }

  async send(
    to: string,
    subject: string,
    textContent: string,
    htmlContent?: string,
  ): Promise<void> {
    await this.sendgridService
      .send({
        to,
        from: this.configService.sendgrid.sender,
        subject: subject,
        text: textContent,
        html: htmlContent ?? textContent,
      })
      .catch(() => {
        throw new MailNotSentDomainException();
      });
  }

  async sendWelcome(
    to: string,
    beneficiary: string,
    productName: string,
    accessCode: string,
  ): Promise<void> {
    const content = WelcomeMailTemplate.replace('{{BENEFICIARY}}', beneficiary)
      .replace('{{PRODUCT_NAME}}', productName)
      .replace('{{ACCESS_CODE}}', accessCode);

    const subject = 'Seja bem-vindo ao ' + productName;

    await this.send(to, subject, content);
  }

  async sendPixNotification(physicianName: string, pixKey: string): Promise<void> {
    const content = PixMailTemplate.replace('{{PHYSICIAN_NAME}}', physicianName).replace(
      '{{PIX_KEY}}',
      pixKey,
    );

    const subject = `Pagamento via PIX está disponível para o(a) Dr(a). ${physicianName}`;
    const recipient = 'financeiro@apisaude.com.br';

    await this.send(recipient, subject, content);
  }
}
