import { ModelStatic } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CrudRepository } from 'src/domain/repositories';
import { UserAddress } from 'src/domain/business/slices/user/entities';

@Injectable()
export class UserAddressRepository extends CrudRepository<UserAddress> {
  constructor(@InjectModel(UserAddress) model: ModelStatic<UserAddress>) {
    super(model);
  }
}
