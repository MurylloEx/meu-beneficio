import { HttpStatus } from '@nestjs/common';
import { DomainException } from 'src/domain/abstractions';

export class S4ePhysicianProceduresNotFoundDomainException extends DomainException {
  constructor() {
    super(
      'Não foi possível encontrar nenhum procedimento relacionado ao CRO de profissional de saúde especificado.',
      HttpStatus.NOT_FOUND,
    );
  }
}
