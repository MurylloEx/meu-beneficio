import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class SearchNearPhysiciansRequestDto {
  @ApiProperty()
  @IsLatitude()
  @Transform(({ value }) => parseFloat(value))
  public latitude: number;

  @ApiProperty()
  @IsLongitude()
  @Transform(({ value }) => parseFloat(value))
  public longitude: number;

  @ApiProperty({ required: false })
  @Max(200)
  @Min(0.1)
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  public distanceInKms: number = 10;

  @ApiProperty({ required: false })
  @IsInt()
  @Min(1)
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  public page: number = 1;

  @ApiProperty({ required: false })
  @Min(10)
  @Max(100)
  @IsInt()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  public pageSize: number = 10;
}
