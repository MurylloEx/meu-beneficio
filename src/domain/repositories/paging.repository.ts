import { ModelStatic } from 'sequelize';
import { Model } from 'sequelize-typescript';
import { CrudRepository } from './crud.repository';
import { PagingRepositoryTemplate, RepoFetch, Page } from 'src/domain/abstractions';

export abstract class PagingRepository<TEntity extends Model>
  extends CrudRepository<TEntity>
  implements PagingRepositoryTemplate<TEntity>
{
  constructor(protected readonly model: ModelStatic<TEntity>) {
    super(model);
  }

  async fetchByOffset(
    offset: number,
    count: number,
    options: RepoFetch<TEntity>,
  ): Promise<TEntity[]> {
    return await super.fetch({
      ...options,
      offset,
      limit: count,
    });
  }

  async fetchByPage(
    page: number,
    pageSize: number,
    options: RepoFetch<TEntity>,
  ): Promise<Page<TEntity>> {
    pageSize = pageSize > 0 ? pageSize : 15;
    pageSize = pageSize <= 200 ? pageSize : 200;

    const offset = page > 0 ? (page - 1) * pageSize : 0;
    const totalItems = await super.count(options);
    const totalPages = Math.ceil(totalItems / pageSize);
    const items = await this.fetchByOffset(offset, pageSize, options);

    return new Page(totalItems, totalPages, page, offset, items);
  }
}
