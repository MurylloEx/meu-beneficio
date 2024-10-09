import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SignupResponseDto {
  @ApiProperty()
  @Expose()
  public cpf: string;

  @ApiProperty()
  @Expose()
  public birthDate: string;

  @ApiProperty()
  @Expose()
  public email: string;

  @ApiProperty()
  @Expose()
  public fullName: string;
}
