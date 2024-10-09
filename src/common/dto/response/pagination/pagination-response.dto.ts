import { Expose, Type } from 'class-transformer';
import { mixin } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

type Constructor<T = {}> = new (...args: any[]) => T;

export function PaginatedResponseDto<TBase extends Constructor>(
  Base: TBase,
  options?: ApiPropertyOptions | undefined,
) {
  class PaginationResponseDto {
    @ApiProperty({ description: 'Número total de itens encontrados.' })
    @Expose()
    public totalItems: number;

    @ApiProperty({ description: 'Número total de páginas disponíveis.' })
    @Expose()
    public totalPages: number;

    @ApiProperty({ description: 'Número da página atual.' })
    @Expose()
    public currentPage: number;

    @ApiProperty({
      description: 'Offset inicial da página em relação a todos os itens encontrados.',
    })
    @Expose()
    public offset: number;

    @ApiProperty({
      isArray: true,
      type: Base,
      ...options,
    })
    @Type(() => Base)
    @Expose()
    public items: Array<InstanceType<TBase>>;
  }

  return mixin(PaginationResponseDto);
}
