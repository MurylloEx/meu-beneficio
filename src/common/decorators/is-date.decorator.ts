import dayjs from 'dayjs';
import dayjsUtc from 'dayjs/plugin/utc';
import dayjsParser from 'dayjs/plugin/customParseFormat';
import { Transform } from 'class-transformer';
import { applyDecorators } from '@nestjs/common';
import { registerDecorator, ValidationOptions } from 'class-validator';

dayjs.extend(dayjsParser);
dayjs.extend(dayjsUtc);

export interface DateRuleOptions {
  isBefore?: string;
  isAfter?: string;
}

export function IsDate(
  format: string,
  dateRuleOptions: DateRuleOptions = {},
  validationOptions?: ValidationOptions,
) {
  const IsDateDecorator = (object: object, propertyName: string) => {
    registerDecorator({
      name: 'IsDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string | Date) {
          const date = dayjs.utc(value);

          if (!date.isValid()) {
            return false;
          }

          if (dateRuleOptions.isAfter) {
            const reference = dayjs.utc(dateRuleOptions.isAfter, format);
            if (!date.isAfter(reference)) {
              return false;
            }
          }

          if (dateRuleOptions.isBefore) {
            const reference = dayjs.utc(dateRuleOptions.isBefore, format);
            if (!date.isBefore(reference)) {
              return false;
            }
          }

          return true;
        },
        defaultMessage() {
          return `The provided value is not a date in '${format}' format.`;
        },
      },
    });
  };

  return applyDecorators(
    Transform(({ value }) => dayjs.utc(value, format).format('YYYY-MM-DD')),
    IsDateDecorator,
  );
}
