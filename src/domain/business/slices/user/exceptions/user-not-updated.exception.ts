import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/abstractions';

export class UserNotUpdatedDomainException extends DomainException {
  constructor() {
    super(
      'O usuário não pôde ser atualizado na base de dados.',
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}
