import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class HealthCheckResultResponseDto {
  @ApiProperty()
  @Expose()
  public environment: string;

  @ApiProperty()
  @Expose()
  public version: string;

  @ApiProperty()
  @Expose()
  public isRunningUnderDebug: boolean;
}
