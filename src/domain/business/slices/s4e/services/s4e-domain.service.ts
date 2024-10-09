import { Injectable } from '@nestjs/common';
import {
  IBasicProfile,
  IPhysician,
  IPhysicianProcedure,
} from 'src/domain/business/slices/s4e/types';
import {
  BasicProfile,
  Physician,
  PhysicianProcedure,
} from 'src/domain/business/slices/s4e/value-objects';
import {
  S4eNearPhysiciansNotFoundDomainException,
  S4ePhysicianProceduresNotFoundDomainException,
  S4eUserNotFoundDomainException,
} from 'src/domain/business/slices/s4e/exceptions';
import { S4eConnectorDomainService } from './s4e-connector-domain.service';

@Injectable()
export class S4eDomainService {
  constructor(private readonly s4eConnectorService: S4eConnectorDomainService) {}

  async getBasicProfile(cpf: string, birthDate: string): Promise<BasicProfile> {
    const query = this.s4eConnectorService.sanitize({
      cpf,
      birthDate,
    });

    const result = await this.s4eConnectorService
      .get<IBasicProfile>('/mercantil/basic-profile', query)
      .catch(() => {
        throw new S4eUserNotFoundDomainException();
      });

    return new BasicProfile(result);
  }

  async checkIfUserExistsInS4e(cpf: string, birthDate: string): Promise<boolean> {
    return await this.getBasicProfile(cpf, birthDate)
      .then(() => true)
      .catch(() => false);
  }

  async searchNearPhysicians(
    latitude: number,
    longitude: number,
    distanceInKms?: number,
    page?: number,
    pageSize?: number,
  ): Promise<Physician[]> {
    const query = this.s4eConnectorService.sanitize({
      latitude,
      longitude,
      distanceInKms,
      page,
      pageSize,
    });

    return await this.s4eConnectorService
      .get<IPhysician[]>('/mercantil/physicians/search', query)
      .then((results) => results.map((result) => new Physician(result)))
      .catch(() => {
        throw new S4eNearPhysiciansNotFoundDomainException();
      });
  }

  async searchPhysicianProcedures(cro: string): Promise<PhysicianProcedure[]> {
    const query = this.s4eConnectorService.sanitize({ cro });

    return await this.s4eConnectorService
      .get<IPhysicianProcedure[]>('/mercantil/procedures/search', query)
      .then((results) => results.map((result) => new PhysicianProcedure(result)))
      .catch(() => {
        throw new S4ePhysicianProceduresNotFoundDomainException();
      });
  }
}
