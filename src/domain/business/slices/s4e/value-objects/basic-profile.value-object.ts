import { ValueObject } from 'src/domain/abstractions';
import { IBasicProfile } from 'src/domain/business/slices/s4e/types';

export class BasicProfile extends ValueObject<IBasicProfile> {
  constructor(data: IBasicProfile) {
    super(data);
    this.ignore(['id']);
  }

  get user() {
    return {
      id: this.data.id,
      fullName: this.data.fullName,
      cpf: this.data.cpf,
      birthdate: this.data.birthdate,
      role: this.data.role,
    };
  }

  get contact() {
    return {
      email: this.data.email,
      phone: this.data.phone,
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
      complement: this.data.addressComplement,
    };
  }
}
