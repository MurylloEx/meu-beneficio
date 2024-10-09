import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/abstractions';

export class AuthEmailAlreadyRegisteredDomainException extends DomainException {
  constructor() {
    super('O e-mail especificado já foi cadastrado no sistema.', HttpStatus.CONFLICT);
  }
}
