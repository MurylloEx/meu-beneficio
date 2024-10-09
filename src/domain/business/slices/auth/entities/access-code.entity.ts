import { CreationOptional } from 'sequelize';
import { IsAlphanumeric, MaxLength, MinLength } from 'class-validator';
import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';
import { DomainEntity } from 'src/domain/abstractions';
import { User } from 'src/domain/business/slices/user';

@Table({ tableName: 'access_codes' })
export class AccessCode extends DomainEntity<AccessCode> {
  @Column
  @ForeignKey(() => User)
  public ownerId: string;

  @Column
  @MinLength(6)
  @MaxLength(6)
  @IsAlphanumeric('en-US')
  public code: string;

  @BelongsTo(() => User)
  public user: CreationOptional<User>;
}
