import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/abstractions';

export class AuthCpfAlreadyRegisteredDomainException extends DomainException {
  constructor() {
    super(
      'O número de CPF especificado já foi cadastrado no sistema.',
      HttpStatus.CONFLICT,
    );
  }
}
