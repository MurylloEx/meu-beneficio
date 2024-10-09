import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class LoginAttemptResponseDto {
  @ApiProperty()
  @Expose()
  public isFirstAccess: boolean;
}
