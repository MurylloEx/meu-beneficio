import { Model } from 'sequelize-typescript';
import { CrudRepositoryTemplate, RepoFetch } from './crud-repository.abstract';
import { Page } from './page.class';

export abstract class PagingRepositoryTemplate<
  TEntity extends Model,
> extends CrudRepositoryTemplate<TEntity> {
  abstract fetchByOffset(
    offset: number,
    count: number,
    options: RepoFetch<TEntity>,
  ): Promise<TEntity[]>;

  abstract fetchByPage(
    page: number,
    pageSize: number,
    options: RepoFetch<TEntity>,
  ): Promise<Page<TEntity>>;
}
