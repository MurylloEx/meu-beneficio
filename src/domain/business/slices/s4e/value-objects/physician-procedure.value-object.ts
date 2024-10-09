import { ValueObject } from 'src/domain/abstractions';
import { IPhysicianProcedure } from 'src/domain/business/slices/s4e/types';

export class PhysicianProcedure extends ValueObject<IPhysicianProcedure> {
  constructor(data: IPhysicianProcedure) {
    super(data);
    this.ignore(['procedureId']);
  }

  get procedure() {
    return {
      id: this.data.procedureId,
      name: this.data.procedureName,
      price: this.data.procedurePrice,
    };
  }

  get physician() {
    return {
      cro: this.data.physicianCro,
      name: this.data.physicianName,
      specialty: this.data.physicianSpecialty,
    };
  }

  get branch() {
    return {
      code: this.data.physicianBranchCode,
      name: this.data.physicianBranchName,
    };
  }
}
