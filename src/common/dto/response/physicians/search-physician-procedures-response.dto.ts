import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PhysicianProcedureResponseDto } from './physician-procedure-response.dto';

export class SearchPhysicianProceduresResponseDto {
  @ApiProperty()
  @Expose()
  public specialties: string[];

  @ApiProperty()
  @Expose()
  @Type(() => PhysicianProcedureResponseDto)
  public procedures: PhysicianProcedureResponseDto[];
}
