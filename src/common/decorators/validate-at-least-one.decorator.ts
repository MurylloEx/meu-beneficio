import { isDefined, ValidateIf } from 'class-validator';

export const ValidateAtLeastOne = (otherFields: string[]) => {
  return ValidateIf((dto) => {
    // Check if has at least one of the otherFields defined in the DTO,
    // otherwise, if doesnt have other fields defined, set the currently
    // as required field in the DTO.
    return !otherFields.some((field) => isDefined(dto[field]));
  });
};
