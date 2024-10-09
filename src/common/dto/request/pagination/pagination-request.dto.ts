import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class PaginationRequestDto {
  @ApiProperty({ required: false })
  @Min(1)
  @IsInt()
  @Type(() => Number)
  public page: number = 1;

  @ApiProperty({ required: false })
  @Min(10)
  @Max(200)
  @IsInt()
  @Type(() => Number)
  public pageSize: number = 15;
}
