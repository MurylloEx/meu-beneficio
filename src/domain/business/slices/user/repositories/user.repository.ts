import { ModelStatic } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CrudRepository } from 'src/domain/repositories';
import { User } from 'src/domain/business/slices/user/entities';

@Injectable()
export class UserRepository extends CrudRepository<User> {
  constructor(@InjectModel(User) model: ModelStatic<User>) {
    super(model);
  }
}
