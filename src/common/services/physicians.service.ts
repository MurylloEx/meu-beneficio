import { Injectable } from '@nestjs/common';
import { S4eDomainService } from 'src/domain';
import { plainToInstance } from 'class-transformer';
import {
  PhysicianProcedureResponseDto,
  SearchNearPhysiciansRequestDto,
  SearchNearPhysiciansResponseDto,
  SearchPhysicianProceduresResponseDto,
} from 'src/common/dto';

@Injectable()
export class PhysiciansService {
  constructor(private readonly s4eDomainService: S4eDomainService) {}

  async searchNearPhysicians(
    query: SearchNearPhysiciansRequestDto,
  ): Promise<SearchNearPhysiciansResponseDto[]> {
    const physicians = await this.s4eDomainService.searchNearPhysicians(
      query.latitude,
      query.longitude,
      query.distanceInKms,
      query.page,
      query.pageSize,
    );

    return plainToInstance(
      SearchNearPhysiciansResponseDto,
      physicians.map((physician) => {
        return {
          physicianId: physician.user.id,
          physicianName: physician.user.name,
          physicianCpf: physician.user.cpf,
          physicianBirthDate: physician.user.birthDate,
          physicianCro: physician.user.cro,
          physicianPhone: physician.contact.phone,
          physicianEmail: physician.contact.email,
          physicianBranchCode: physician.branch.code,
          physicianBranchName: physician.user.name,
          addressStreet: physician.address.street,
          addressNumber: physician.address.number,
          addressNeighborhood: physician.address.neighborhood,
          addressCity: physician.address.city,
          addressState: physician.address.state,
          addressZipCode: physician.address.zipCode,
          longitude: physician.geolocation.longitude,
          latitude: physician.geolocation.latitude,
          distanceInKilometers: physician.geolocation.distanceInKilometers,
        };
      }),
    );
  }

  async searchPhysicianProcedures(
    cro: string,
  ): Promise<SearchPhysicianProceduresResponseDto> {
    const foundProcedures = await this.s4eDomainService.searchPhysicianProcedures(cro);

    const specialties = foundProcedures.map(({ physician }) => physician.specialty);

    const dto = new SearchPhysicianProceduresResponseDto();

    dto.specialties = [...new Set(specialties)];
    dto.procedures = plainToInstance(
      PhysicianProcedureResponseDto,
      foundProcedures.map((procedure) => ({
        procedureId: procedure.procedure.id,
        procedureName: procedure.procedure.name,
        procedurePrice: procedure.procedure.price,
        physicianName: procedure.physician.name,
        physicianCro: procedure.physician.cro,
        physicianSpecialty: procedure.physician.specialty,
        physicianBranchCode: procedure.branch.code,
        physicianBranchName: procedure.branch.name,
      })),
    );

    return dto;
  }
}
