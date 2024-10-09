import { CreationOptional } from 'sequelize';
import { IsInt, IsPositive } from 'class-validator';
import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';
import { DomainEntity } from 'src/domain/abstractions';
import { User } from './user.entity';

@Table({ tableName: 'user_roles' })
export class UserRole extends DomainEntity<UserRole> {
  @ForeignKey(() => User)
  @Column
  public ownerId: string;

  @Column
  @IsInt()
  @IsPositive()
  public role: number;

  @BelongsTo(() => User)
  public user: CreationOptional<User>;
}
