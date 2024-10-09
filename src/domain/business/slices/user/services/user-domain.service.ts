import { Injectable } from '@nestjs/common';

import {
  UserAddressRepository,
  UserRepository,
  UserRoleRepository,
} from 'src/domain/business/slices/user/repositories';
import { UserRoleId } from 'src/domain/business/slices/user/types';
import { User, UserAddress, UserRole } from 'src/domain/business/slices/user/entities';
import { UserNotFoundDomainException } from 'src/domain/business/slices/user/exceptions';

@Injectable()
export class UserDomainService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userRoleRepository: UserRoleRepository,
    private readonly userAddressRepository: UserAddressRepository,
  ) {}

  async create(
    name: string,
    cpf: string,
    birthDate: string,
    email: string,
    phone: string,
    s4eUserId: number,
    initialRole: UserRoleId,
  ): Promise<User> {
    const createdUser = await this.userRepository.create({
      name,
      cpf,
      birthDate,
      email,
      phone,
      s4eUserId,
    });

    await this.userRoleRepository.create({
      ownerId: createdUser.id,
      user: createdUser,
      role: initialRole.valueOf(),
    });

    return await createdUser.reload({
      include: [{ model: UserAddress }, { model: UserRole }],
    });
  }

  async fetchByCpfAndBirthDate(cpf: string, birthDate: string): Promise<User> {
    return await this.userRepository.fetchOne({
      where: {
        cpf,
        birthDate,
      },
    });
  }

  async checkIfUserAlreadyRegistered(cpf: string, birthDate: string): Promise<boolean> {
    return await this.userRepository.exists({
      where: {
        cpf,
        birthDate,
      },
    });
  }

  async checkIfEmailIsUnavailable(email: string): Promise<boolean> {
    return await this.userRepository.exists({
      where: { email },
    });
  }

  async checkIfCpfIsUnavailable(cpf: string): Promise<boolean> {
    return await this.userRepository.exists({
      where: { cpf },
    });
  }

  async fetchById(userId: string): Promise<User> {
    return await this.userRepository.fetchUnique(userId).catch(() => {
      throw new UserNotFoundDomainException();
    });
  }
}
