import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/abstractions';

export class AuthProvidedCredentialsNotValidDomainException extends DomainException {
  constructor() {
    super(
      'O CPF e/ou a data de nascimento especificados não constam no sistema, entre em contato com o setor de ajuda.',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
