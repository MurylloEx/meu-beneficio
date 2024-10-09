import { ValueObject } from 'src/domain/abstractions';
import { IPhysician } from 'src/domain/business/slices/s4e/types';

export class Physician extends ValueObject<IPhysician> {
  constructor(data: IPhysician) {
    super(data);
    this.ignore(['physicianId']);
  }

  get user() {
    return {
      id: this.data.physicianId,
      name: this.data.physicianName,
      cpf: this.data.physicianCpf,
      birthDate: this.data.physicianBirthDate,
      cro: this.data.physicianCro,
    };
  }

  get contact() {
    return {
      phone: this.data.physicianPhone,
      email: this.data.physicianEmail,
    };
  }

  get branch() {
    return {
      code: this.data.physicianBranchCode,
      name: this.data.physicianBranchName,
    };
  }

  get address() {
    return {
      zipCode: this.data.addressZipCode,
      neighborhood: this.data.addressNeighborhood,
      city: this.data.addressCity,
      state: this.data.addressState,
      number: this.data.addressNumber,
      street: this.data.addressStreet,
    };
  }

  get geolocation() {
    return {
      longitude: this.data.longitude,
      latitude: this.data.latitude,
      distanceInKilometers: this.data.distanceInKilometers,
    };
  }
}
