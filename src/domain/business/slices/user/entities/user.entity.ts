import { CreationOptional } from 'sequelize';
import { Column, HasMany, Table } from 'sequelize-typescript';
import {
  IsEmail,
  IsInt,
  IsNumberString,
  IsPhoneNumber,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { DomainEntity } from 'src/domain/abstractions';
import { AccessCode } from 'src/domain/business/slices/auth/entities';
import { UserRole } from './user-role.entity';
import { UserAddress } from './user-address.entity';

@Table({ tableName: 'users' })
export class User extends DomainEntity<User> {
  @Column
  @IsString()
  @MinLength(4)
  @MaxLength(255)
  public name: string;

  @Column
  @IsNumberString()
  @MinLength(11)
  @MaxLength(11)
  public cpf: string;

  @Column
  public birthDate: string;

  @Column
  @IsEmail()
  public email: string;

  @Column
  @IsPhoneNumber('BR')
  public phone: string;

  @Column
  @IsInt()
  @IsPositive()
  public s4eUserId: number;

  @HasMany(() => UserRole)
  public roles: CreationOptional<UserRole[]>;

  @HasMany(() => UserAddress)
  public addresses: CreationOptional<UserAddress[]>;

  @HasMany(() => AccessCode)
  public accessCodes: CreationOptional<AccessCode[]>;
}
