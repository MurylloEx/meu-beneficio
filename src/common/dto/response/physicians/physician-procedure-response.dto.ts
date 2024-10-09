import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PhysicianProcedureResponseDto {
  @ApiProperty()
  @Expose()
  public procedureId: number;

  @ApiProperty()
  @Expose()
  public procedureName: string;

  @ApiProperty()
  @Expose()
  public procedurePrice: number;

  @ApiProperty()
  @Expose()
  public physicianName: string;

  @ApiProperty()
  @Expose()
  public physicianCro: string;

  @ApiProperty()
  @Expose()
  public physicianSpecialty: string;

  @ApiProperty()
  @Expose()
  public physicianBranchCode: number;

  @ApiProperty()
  @Expose()
  public physicianBranchName: string;
}
