import { Model } from 'sequelize-typescript';
import { MakeNullishOptional } from 'sequelize/types/utils';
import {
  BulkCreateOptions,
  CreateOptions,
  DestroyOptions,
  FindOptions,
  InferAttributes,
  InferCreationAttributes,
  UpdateOptions,
} from 'sequelize';

export type RepoPrimaryKey = string | number | bigint;
export type RepoDelete<TEntity extends Model> = DestroyOptions<InferAttributes<TEntity>>;
export type RepoUpdate<TEntity extends Model> = UpdateOptions<InferAttributes<TEntity>>;
export type RepoFetch<TEntity extends Model> = FindOptions<InferAttributes<TEntity>>;
export type RepoCreate<TEntity extends Model> = CreateOptions<InferAttributes<TEntity>>;
export type RepoCreateMany<TEntity extends Model> = BulkCreateOptions<
  InferAttributes<TEntity>
>;
export type RepoCreateValue<TEntity extends Model> = MakeNullishOptional<
  InferCreationAttributes<TEntity>
>;

export abstract class CrudRepositoryTemplate<TEntity extends Model> {
  abstract createMany(
    value: RepoCreateValue<TEntity>[],
    options?: RepoCreate<TEntity>,
  ): Promise<TEntity[]>;
  abstract create(
    value: RepoCreateValue<TEntity>,
    options?: RepoCreateMany<TEntity>,
  ): Promise<TEntity>;
  abstract fetchOne(options: RepoFetch<TEntity>): Promise<TEntity>;
  abstract updateOne(
    options: RepoUpdate<TEntity>,
    value: Partial<InferAttributes<TEntity>>,
  ): Promise<TEntity>;
  abstract deleteOne(options: RepoDelete<TEntity>): Promise<TEntity>;
  abstract restoreOne(options: RepoFetch<TEntity>): Promise<TEntity>;

  abstract fetchUnique(
    identifier: RepoPrimaryKey,
    options?: RepoFetch<TEntity>,
  ): Promise<TEntity>;
  abstract updateUnique(
    identifier: RepoPrimaryKey,
    value: Partial<InferAttributes<TEntity>>,
  ): Promise<TEntity>;
  abstract deleteUnique(identifier: RepoPrimaryKey): Promise<TEntity>;
  abstract restoreUnique(identifier: RepoPrimaryKey): Promise<TEntity>;

  abstract fetch(options: RepoFetch<TEntity>): Promise<TEntity[]>;
  abstract update(
    options: RepoUpdate<TEntity>,
    value: Partial<TEntity>,
  ): Promise<TEntity[]>;
  abstract delete(options: RepoDelete<TEntity>): Promise<TEntity[]>;
  abstract restore(options: RepoFetch<TEntity>): Promise<TEntity[]>;

  abstract count(options: RepoFetch<TEntity>): Promise<number>;
  abstract exists(options: RepoFetch<TEntity>): Promise<boolean>;
}
