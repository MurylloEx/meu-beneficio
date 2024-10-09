import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SearchNearPhysiciansResponseDto {
  @ApiProperty()
  @Expose()
  public physicianId: number;

  @ApiProperty()
  @Expose()
  public physicianName: string;

  @ApiProperty()
  @Expose()
  public physicianCpf: string;

  @ApiProperty()
  @Expose()
  public physicianBirthDate: string;

  @ApiProperty()
  @Expose()
  public physicianCro: number;

  @ApiProperty()
  @Expose()
  public physicianPhone: string;

  @ApiProperty()
  @Expose()
  public physicianEmail: string;

  @ApiProperty()
  @Expose()
  public physicianBranchCode: number;

  @ApiProperty()
  @Expose()
  public physicianBranchName: string;

  @ApiProperty()
  @Expose()
  public addressStreet: string;

  @ApiProperty()
  @Expose()
  public addressNumber: number;

  @ApiProperty()
  @Expose()
  public addressNeighborhood: string;

  @ApiProperty()
  @Expose()
  public addressCity: string;

  @ApiProperty()
  @Expose()
  public addressState: string;

  @ApiProperty()
  @Expose()
  public addressZipCode: string;

  @ApiProperty()
  @Expose()
  public longitude: number;

  @ApiProperty()
  @Expose()
  public latitude: number;

  @ApiProperty()
  @Expose()
  public distanceInKilometers: number;
}
