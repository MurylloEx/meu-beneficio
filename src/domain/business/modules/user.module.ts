import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import {
  User,
  UserRole,
  UserAddress,
  UserRepository,
  UserRoleRepository,
  UserDomainService,
  UserAddressRepository,
} from 'src/domain/business/slices/user';

@Module({
  imports: [SequelizeModule.forFeature([User, UserRole, UserAddress])],
  providers: [
    UserRepository,
    UserAddressRepository,
    UserRoleRepository,
    UserDomainService,
  ],
  exports: [UserDomainService],
})
export class UserModule {}
