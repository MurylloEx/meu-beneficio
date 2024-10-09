import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/abstractions';

export class UserNotFoundDomainException extends DomainException {
  constructor() {
    super('The specified User was not found in the database.', HttpStatus.NOT_FOUND);
  }
}
