import { ClassConstructor, plainToInstance } from 'class-transformer';
import { Model } from 'sequelize-typescript';

export class Page<TEntity extends Model> {
  constructor(
    private totalItems: number,
    private totalPages: number,
    private currentPage: number,
    private offset: number,
    private items: TEntity[],
  ) {}

  getTotalItems(): number {
    return this.totalItems;
  }

  getTotalPages(): number {
    return this.totalPages;
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  getOffset(): number {
    return this.offset;
  }

  getItems(): TEntity[] {
    return this.items;
  }

  isEmpty(): boolean {
    return this.items.length == 0;
  }

  public toDto<T>(dtoClass: ClassConstructor<T>, objectToMerge?: Partial<T>): T {
    const plain = {
      totalItems: this.totalItems,
      totalPages: this.totalPages,
      currentPage: this.currentPage,
      offset: this.offset,
      items: this.items,
    };

    Object.assign(plain, objectToMerge ?? {});

    return plainToInstance(dtoClass, plain, {
      strategy: 'excludeAll',
    });
  }
}
