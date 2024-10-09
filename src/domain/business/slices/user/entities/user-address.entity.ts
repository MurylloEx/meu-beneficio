import { CreationOptional } from 'sequelize';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';
import { DomainEntity } from 'src/domain/abstractions';
import { User } from './user.entity';

@Table({ tableName: 'user_addresses' })
export class UserAddress extends DomainEntity<UserAddress> {
  @ForeignKey(() => User)
  @Column
  public ownerId: string;

  @Column
  @IsString()
  @MaxLength(8)
  public zipCode: string;

  @Column
  @IsString()
  @MaxLength(2)
  @MinLength(2)
  public state: string;

  @Column
  @IsString()
  @MaxLength(256)
  public city: string;

  @Column
  @IsString()
  @MaxLength(256)
  public neighborhood: string;

  @Column
  @IsString()
  @MaxLength(256)
  public street: number;

  @Column
  @IsString()
  @MaxLength(8)
  public number: number;

  @BelongsTo(() => User)
  public user: CreationOptional<User>;
}
