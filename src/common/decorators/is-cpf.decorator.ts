import { registerDecorator, ValidationOptions } from 'class-validator';

// Source: https://gist.github.com/joaohcrangel/8bd48bcc40b9db63bef7201143303937?permalink_comment_id=4877199#gistcomment-4877199
export function IsCpf(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsCpf',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(input: string) {
          if (typeof input !== 'string') {
            return false;
          }

          const value = input.replace(/[^\d]+/g, '');

          if (value.length !== 11 || !!value.match(/(\d)\1{10}/)) {
            return false;
          }

          const digits = value.split('').map(Number);

          const getVerifyingDigit = (array: number[]) => {
            const reduced = array.reduce(
              (sum, digit, index) => sum + digit * (array.length - index + 1),
              0,
            );
            return ((reduced * 10) % 11) % 10;
          };

          return (
            getVerifyingDigit(digits.slice(0, 9)) === digits[9] &&
            getVerifyingDigit(digits.slice(0, 10)) === digits[10]
          );
        },
        defaultMessage() {
          return `O dígito verificador não é válido para o CPF fornecido.`;
        },
      },
    });
  };
}
