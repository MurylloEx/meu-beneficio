import { ModelStatic } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CrudRepository } from 'src/domain/repositories';
import { UserRole } from 'src/domain/business/slices/user/entities';

@Injectable()
export class UserRoleRepository extends CrudRepository<UserRole> {
  constructor(@InjectModel(UserRole) model: ModelStatic<UserRole>) {
    super(model);
  }
}
