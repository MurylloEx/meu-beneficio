import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/abstractions';

export class AuthProvidedCodeNotValidDomainException extends DomainException {
  constructor() {
    super(
      'O código de acesso especificado não é válido, tente novamente reenviando o código para o seu e-mail cadastrado.',
      HttpStatus.UNAUTHORIZED,
    );
  }
}
