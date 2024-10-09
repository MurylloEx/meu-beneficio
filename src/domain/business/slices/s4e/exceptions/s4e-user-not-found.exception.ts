import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/abstractions';

export class S4eUserNotFoundDomainException extends DomainException {
  constructor() {
    super(
      'O usuário especificado não foi encontrado no S4e. Verifique os dados fornecidos e tente novamente.',
      HttpStatus.NOT_FOUND,
    );
  }
}
