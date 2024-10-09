import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/abstractions';

export class S4eNearPhysiciansNotFoundDomainException extends DomainException {
  constructor() {
    super(
      'Não foi possível encontrar nenhum profissional de saúde próximo da sua localidade.',
      HttpStatus.NOT_FOUND,
    );
  }
}
