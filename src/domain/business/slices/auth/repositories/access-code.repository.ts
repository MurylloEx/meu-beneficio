import dayjs from 'dayjs';
import dayjsUtc from 'dayjs/plugin/utc';
import dayjsParser from 'dayjs/plugin/customParseFormat';
import { ModelStatic, Op } from 'sequelize';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CrudRepository } from 'src/domain/repositories';
import { User, UserRole } from 'src/domain/business/slices/user/entities';
import { AccessCode } from 'src/domain/business/slices/auth/entities';

dayjs.extend(dayjsParser);
dayjs.extend(dayjsUtc);

@Injectable()
export class AccessCodeRepository extends CrudRepository<AccessCode> {
  constructor(@InjectModel(AccessCode) model: ModelStatic<AccessCode>) {
    super(model);
  }

  async fetchByCodeAndUserCpfAndUserBirthDate(
    code: string,
    userCpf: string,
    userBirthDate: string,
  ): Promise<AccessCode> {
    return await this.fetchOne({
      where: {
        code,
        createdAt: {
          [Op.lte]: dayjs.utc().add(30, 'days').toDate(),
        },
      },
      include: [
        {
          model: User,
          where: {
            cpf: userCpf,
            birthDate: userBirthDate,
          },
          include: [{ model: UserRole }],
        },
      ],
    });
  }

  async fetchLastAvailableByUserCpf(userCpf: string): Promise<AccessCode> {
    return await this.fetchOne({
      where: {
        createdAt: {
          [Op.lte]: dayjs.utc().add(30, 'days').toDate(),
        },
      },
      include: [
        {
          model: User,
          where: {
            cpf: userCpf,
          },
        },
      ],
    });
  }

  async checkIfExistsByUserCpf(userCpf: string): Promise<boolean> {
    return await this.exists({
      where: {
        createdAt: {
          [Op.lte]: dayjs.utc().add(30, 'days').toDate(),
        },
      },
      include: [
        {
          model: User,
          where: {
            cpf: userCpf,
          },
        },
      ],
    });
  }
}
