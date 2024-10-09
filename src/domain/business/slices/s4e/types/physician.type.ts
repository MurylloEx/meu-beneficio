export interface IPhysician {
  physicianId: number;
  physicianName: string;
  physicianCpf: string;
  physicianBirthDate: string;
  physicianCro: number;
  physicianPhone: string;
  physicianEmail: string;
  physicianBranchCode: number;
  physicianBranchName: string;
  addressStreet: string;
  addressNumber: number;
  addressNeighborhood: string;
  addressCity: string;
  addressState: string;
  addressZipCode: string;
  longitude: number;
  latitude: number;
  distanceInKilometers: number;
}
