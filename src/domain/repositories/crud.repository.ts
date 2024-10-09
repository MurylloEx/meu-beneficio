import { Model } from 'sequelize-typescript';
import { InferAttributes, ModelStatic } from 'sequelize';
import {
  RepoUpdate,
  RepoDelete,
  RepoFetch,
  RepoCreate,
  RepoCreateMany,
  RepoCreateValue,
  RepoPrimaryKey,
  CrudRepositoryTemplate,
} from 'src/domain/abstractions';

export abstract class CrudRepository<TEntity extends Model>
  implements CrudRepositoryTemplate<TEntity>
{
  constructor(protected readonly model: ModelStatic<TEntity>) {}

  async createMany(
    value: RepoCreateValue<TEntity>[],
    options?: RepoCreateMany<TEntity>,
  ): Promise<TEntity[]> {
    return await this.model.bulkCreate(value, options);
  }

  async create(
    value: RepoCreateValue<TEntity>,
    options?: RepoCreate<TEntity>,
  ): Promise<TEntity> {
    return await this.model.create(value, options);
  }

  async fetch(options: RepoFetch<TEntity>): Promise<TEntity[]> {
    return await this.model.findAll(options);
  }

  async fetchOne(options: RepoFetch<TEntity>): Promise<TEntity> {
    const entity = await this.model.findOne(options);

    if (!entity) throw new Error('The specified record was not found in the database.');

    return entity;
  }

  async fetchUnique(
    identifier: RepoPrimaryKey,
    options?: RepoFetch<TEntity>,
  ): Promise<TEntity> {
    const entity = await this.model.findByPk(identifier, options);

    if (!entity) throw new Error('The specified record was not found in the database.');

    return entity;
  }

  async update(
    options: RepoUpdate<TEntity>,
    value: Partial<TEntity>,
  ): Promise<TEntity[]> {
    await this.model.update(value, options);
    return await this.fetch(options);
  }

  async updateUnique(
    identifier: RepoPrimaryKey,
    value: Partial<InferAttributes<TEntity>>,
  ): Promise<TEntity> {
    const entity = await this.fetchUnique(identifier);
    return await entity.update(value);
  }

  async updateOne(
    options: RepoUpdate<TEntity>,
    value: Partial<InferAttributes<TEntity>>,
  ): Promise<TEntity> {
    const entity = await this.fetchOne(options);
    return await entity.update(value);
  }

  async delete(options: RepoDelete<TEntity>): Promise<TEntity[]> {
    const entities = await this.fetch(options);
    await Promise.all(entities.map((entity) => entity.destroy()));
    return entities;
  }

  async deleteUnique(identifier: RepoPrimaryKey): Promise<TEntity> {
    const entity = await this.fetchUnique(identifier);
    await entity.destroy();
    return entity;
  }

  async deleteOne(options: RepoDelete<TEntity>): Promise<TEntity> {
    const entity = await this.fetchOne(options);
    await entity.destroy();
    return entity;
  }

  async restore(options: RepoFetch<TEntity>): Promise<TEntity[]> {
    const entities = await this.fetch(options);
    await Promise.all(entities.map((entity) => entity.restore(options)));
    return entities;
  }

  async restoreUnique(identifier: RepoPrimaryKey): Promise<TEntity> {
    const entity = await this.fetchUnique(identifier, { paranoid: false });
    await entity.restore();
    return entity;
  }

  async restoreOne(options: RepoFetch<TEntity>): Promise<TEntity> {
    const entity = await this.fetchOne({ ...options, paranoid: false });
    await entity.restore();
    return entity;
  }

  async count(options: RepoFetch<TEntity>): Promise<number> {
    return await this.model.count(options);
  }

  async exists(options: RepoFetch<TEntity>): Promise<boolean> {
    return (await this.count(options)) > 0;
  }
}
