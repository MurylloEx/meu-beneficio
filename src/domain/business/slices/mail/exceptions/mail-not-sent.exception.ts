import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/abstractions';

export class MailNotSentDomainException extends DomainException {
  constructor() {
    super(
      'O e-mail não pôde ser enviado devido a uma falha relatada pelo Sendgrid.',
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
