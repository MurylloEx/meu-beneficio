import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsAlphanumeric,
  IsCreditCard,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPostalCode,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsAddressState, IsCpf } from 'src/common/decorators';

export class PurchaseCouponRequestDto {
  @ApiProperty()
  @IsCreditCard()
  public cardNumber: string;

  @ApiProperty()
  @IsNumberString()
  @MinLength(3)
  @MaxLength(4)
  public cardSecurityCode: string;

  @ApiProperty()
  @IsString()
  @Matches(/^(?:0[1-9]|1[0-2])\/(?:[2-5]\d)$/)
  public cardExpiration: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(32)
  public cardHolderName: string;

  @ApiProperty()
  @IsCpf()
  public cardHolderCpf: string;

  @ApiProperty()
  @IsPostalCode('BR')
  public addressZipCode: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(128)
  public addressNeighborhood: string;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(128)
  public addressCity: string;

  @ApiProperty()
  @IsAddressState()
  public addressState: string;

  @IsAlphanumeric()
  @MinLength(1)
  @MaxLength(4)
  public addressNumber: string;

  @IsString()
  @MinLength(4)
  @MaxLength(128)
  public addressStreet: string;

  @IsString()
  @IsOptional()
  public addressComplement: string;

  @ApiProperty()
  @IsNumberString()
  public physicianCro: string;

  @ApiProperty()
  @IsNumber(undefined, { each: true })
  @Type(() => Number)
  public physicianProcedureIds: number[];
}
