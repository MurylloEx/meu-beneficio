import { IsIn, ValidationOptions } from 'class-validator';

const NORTH_REGION = ['AC', 'AP', 'AM', 'PA', 'RO', 'RR', 'TO'];
const NORTHEAST_REGION = ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'];
const MIDWEST_REGION = ['DF', 'GO', 'MT', 'MS'];
const SOUTHEAST_REGION = ['ES', 'MG', 'RJ', 'SP'];
const SOUTH_REGION = ['PR', 'RS', 'SC'];

export const IsAddressState = (validationOptions?: ValidationOptions) => {
  return IsIn(
    [
      ...NORTH_REGION,
      ...NORTHEAST_REGION,
      ...MIDWEST_REGION,
      ...SOUTHEAST_REGION,
      ...SOUTH_REGION,
    ],
    validationOptions,
  );
};
