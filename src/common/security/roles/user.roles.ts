import { UserRoleId } from 'src/domain';

export enum Roles {
  Physician = 'physician',
  Beneficiary = 'beneficiary',
}

export const MapRoleIdToRole = new Map<UserRoleId, Roles>([
  [UserRoleId.Beneficiary, Roles.Beneficiary],
  [UserRoleId.Physician, Roles.Physician],
]);

export const MapRoleToRoleId = new Map<Roles, UserRoleId>([
  [Roles.Beneficiary, UserRoleId.Beneficiary],
  [Roles.Physician, UserRoleId.Physician],
]);
