import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Roles } from 'src/common/security';

export class ConfirmCodeResponseDto {
  @ApiProperty()
  @Expose()
  public accessToken: string;

  @ApiProperty()
  @Expose()
  public fullName: string;

  @ApiProperty()
  @Expose()
  public cpf: string;

  @ApiProperty()
  @Expose()
  public birthDate: Date;

  @ApiProperty()
  @Expose()
  public email: string;

  @ApiProperty()
  @Expose()
  public phone: string;

  @ApiProperty({ enum: Roles, isArray: true })
  @Expose()
  public roles: Roles[];
}
