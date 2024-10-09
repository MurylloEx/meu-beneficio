import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { IsCpf, IsDate } from 'src/common/decorators';

export class ConfirmCodeRequestDto {
  @ApiProperty({ format: '000.000.000-00' })
  @IsCpf()
  public cpf: string;

  @ApiProperty({ format: 'dd/mm/yyyy' })
  @IsDate('DD/MM/YYYY', {
    isAfter: '01/01/1874',
    isBefore: '31/12/2014',
  })
  public birthDate: string;

  @ApiProperty({ format: 'A1B2C3' })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(6)
  @IsAlphanumeric('en-US')
  public code: string;
}
