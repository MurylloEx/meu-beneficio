import { Injectable } from '@nestjs/common';

import { S4eDomainService } from 'src/domain/business/slices/s4e';
import { MailDomainService } from 'src/domain/business/slices/mail';
import { AccessCode } from 'src/domain/business/slices/auth/entities';
import { User, UserDomainService, UserRoleId } from 'src/domain/business/slices/user';
import { AccessCodeRepository } from 'src/domain/business/slices/auth/repositories';
import {
  AuthCpfAlreadyRegisteredDomainException,
  AuthEmailAlreadyRegisteredDomainException,
  AuthProvidedCodeNotValidDomainException,
  AuthProvidedCredentialsNotValidDomainException,
  AuthUserSpecifiedIsNotAPhysicianOrPatientDomainException,
} from 'src/domain/business/slices/auth/exceptions';

@Injectable()
export class AuthDomainService {
  constructor(
    private readonly accessCodeRepository: AccessCodeRepository,
    private readonly userDomainService: UserDomainService,
    private readonly s4eDomainService: S4eDomainService,
    private readonly mailDomainService: MailDomainService,
  ) {}

  generateCode(length: number) {
    const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const chars = upperLetters + lowerLetters + numbers;

    return [...Array(length)]
      .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
      .join('');
  }

  async checkIfIsFirstAccess(userCpf: string, userBirthDate: string): Promise<boolean> {
    const isUserAlreadyRegistered =
      await this.userDomainService.checkIfUserAlreadyRegistered(userCpf, userBirthDate);

    const isUserInS4e = await this.s4eDomainService.checkIfUserExistsInS4e(
      userCpf,
      userBirthDate,
    );

    if (!isUserInS4e) {
      throw new AuthProvidedCredentialsNotValidDomainException();
    }

    return !isUserAlreadyRegistered;
  }

  async signup(userCpf: string, userBirthDate: string, userEmail: string): Promise<User> {
    const profile = await this.s4eDomainService.getBasicProfile(userCpf, userBirthDate);

    const isBeneficiary = profile.user.role == 'beneficiary';
    const isPhysician = profile.user.role == 'accredited';

    if (!isBeneficiary && !isPhysician) {
      throw new AuthUserSpecifiedIsNotAPhysicianOrPatientDomainException();
    }

    const isEmailUnavailable =
      await this.userDomainService.checkIfEmailIsUnavailable(userEmail);

    if (isEmailUnavailable) {
      throw new AuthEmailAlreadyRegisteredDomainException();
    }

    const isCpfUnavailable =
      await this.userDomainService.checkIfCpfIsUnavailable(userCpf);

    if (isCpfUnavailable) {
      throw new AuthCpfAlreadyRegisteredDomainException();
    }

    const initialUserRole = isBeneficiary ? UserRoleId.Beneficiary : UserRoleId.Physician;

    const createdUser = await this.userDomainService.create(
      profile.user.fullName,
      profile.user.cpf,
      profile.user.birthdate,
      userEmail,
      profile.contact.phone,
      profile.user.id,
      initialUserRole,
    );

    return createdUser;
  }

  async sendCode(userCpf: string, userBirthDate: string): Promise<AccessCode> {
    const hasAccessCodeAvailable =
      await this.accessCodeRepository.checkIfExistsByUserCpf(userCpf);

    if (hasAccessCodeAvailable) {
      const lastAccessCode =
        await this.accessCodeRepository.fetchLastAvailableByUserCpf(userCpf);

      await this.mailDomainService.sendWelcome(
        lastAccessCode.user.email,
        lastAccessCode.user.name,
        'App Mercantil',
        lastAccessCode.code,
      );

      return lastAccessCode;
    }

    const user = await this.userDomainService.fetchByCpfAndBirthDate(
      userCpf,
      userBirthDate,
    );

    await this.accessCodeRepository.delete({
      where: {
        ownerId: user.id,
      },
    });

    const newAccessCode = await this.accessCodeRepository.create({
      code: this.generateCode(6),
      ownerId: user.id,
      user: user,
    });

    await this.mailDomainService.sendWelcome(
      user.email,
      user.name,
      'App Mercantil',
      newAccessCode.code,
    );

    return await newAccessCode.reload({
      include: [{ model: User }],
    });
  }

  async confirmCode(userCpf: string, userBirthDate: string, code: string): Promise<User> {
    const accessCode = await this.accessCodeRepository
      .fetchByCodeAndUserCpfAndUserBirthDate(code, userCpf, userBirthDate)
      .catch(() => {
        throw new AuthProvidedCodeNotValidDomainException();
      });

    await this.accessCodeRepository.deleteUnique(accessCode.id);

    return accessCode.user;
  }
}
