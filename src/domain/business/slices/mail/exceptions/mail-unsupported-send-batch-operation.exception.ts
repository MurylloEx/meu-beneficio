import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/abstractions';

export class MailUnsupportedSendBatchOperationDomainException extends DomainException {
  constructor() {
    super(
      'The send batch operation is currently not supported in this API version.',
      HttpStatus.NOT_IMPLEMENTED,
    );
  }
}
