import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { IsCpf, IsDate } from 'src/common/decorators';

export class SignupRequestDto {
  @ApiProperty({ format: '000.000.000-00' })
  @IsCpf()
  public cpf: string;

  @ApiProperty({ format: 'dd/mm/yyyy' })
  @IsDate('DD/MM/YYYY', {
    isAfter: '01/01/1874',
    isBefore: '31/12/2014',
  })
  public birthDate: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public email: string;
}