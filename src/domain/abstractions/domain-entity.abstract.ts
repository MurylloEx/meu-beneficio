import { validate } from 'class-validator';
import { HttpStatus } from '@nestjs/common';
import {
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  UUID,
  UUIDV4,
} from 'sequelize';
import { ClassConstructor, instanceToPlain, plainToInstance } from 'class-transformer';

import {
  Model,
  Column,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BeforeUpdate,
  BeforeCreate,
} from 'sequelize-typescript';

import { DomainException } from 'src/domain/abstractions';

export abstract class DomainEntity<TEntity extends Model> extends Model<
  InferAttributes<TEntity>,
  InferCreationAttributes<TEntity>
> {
  @PrimaryKey
  @Column({
    type: UUID,
    defaultValue: UUIDV4,
  })
  public id: CreationOptional<string>;

  @CreatedAt
  public createdAt: CreationOptional<Date>;

  @UpdatedAt
  public updatedAt?: CreationOptional<Date>;

  @DeletedAt
  public deletedAt?: CreationOptional<Date>;

  @BeforeUpdate
  @BeforeCreate
  static async validate() {
    const errors = await validate(this);
    if (errors.length > 0) {
      throw new DomainException(errors, HttpStatus.BAD_REQUEST);
    }
  }

  public toPlain() {
    return this.dataValues;
  }

  public toDto<T>(dtoClass: ClassConstructor<T>, objectToMerge?: Partial<T>): T {
    const plain = instanceToPlain(this.toPlain());
    Object.assign(plain, objectToMerge ?? {});
    return plainToInstance<T, Record<string, object>>(dtoClass, plain, {
      strategy: 'excludeAll',
    });
  }
}
