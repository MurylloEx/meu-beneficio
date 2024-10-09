import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { IsCpf } from 'src/common/decorators';

export class JwtRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  public id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Expose()
  public name: string;

  @ApiProperty({ format: '000.000.000-00' })
  @IsCpf()
  @Expose()
  public cpf: string;

  @ApiProperty()
  @IsEmail()
  @Expose()
  public email: string;

  @ApiProperty({ format: '(00) 9 0000-0000' })
  @IsPhoneNumber('BR')
  @Expose()
  public phone: string;

  @ApiProperty({ format: 'dd/mm/yyyy' })
  @IsDateString()
  @Expose()
  public birthDate: string;

  @ApiProperty()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @Expose()
  public roles: string[];
}
