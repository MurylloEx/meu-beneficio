import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  ConfirmCodeRequestDto,
  ConfirmCodeResponseDto,
  JwtRequestDto,
  LoginAttemptRequestDto,
  LoginAttemptResponseDto,
  SendCodeRequestDto,
  SendCodeResponseDto,
  SignupRequestDto,
  SignupResponseDto,
} from 'src/common/dto';
import { AuthDomainService } from 'src/domain';
import { MapRoleIdToRole, Roles } from 'src/common/security';

@Injectable()
export class AuthService {
  constructor(
    private readonly authDomainService: AuthDomainService,
    private readonly jwtService: JwtService,
  ) {}

  async login(body: LoginAttemptRequestDto): Promise<LoginAttemptResponseDto> {
    const isFirstAccess = await this.authDomainService.checkIfIsFirstAccess(
      body.cpf,
      body.birthDate,
    );

    return plainToInstance(LoginAttemptResponseDto, {
      isFirstAccess,
    });
  }

  async signup(body: SignupRequestDto): Promise<SignupResponseDto> {
    const createdUser = await this.authDomainService.signup(
      body.cpf,
      body.birthDate,
      body.email,
    );

    return plainToInstance(SignupResponseDto, {
      cpf: createdUser.cpf,
      birthDate: createdUser.birthDate,
      email: createdUser.email,
      fullName: createdUser.name,
    });
  }

  async sendCode(body: SendCodeRequestDto): Promise<SendCodeResponseDto> {
    const accessCode = await this.authDomainService.sendCode(body.cpf, body.birthDate);

    return plainToInstance(SendCodeResponseDto, {
      cpf: accessCode.user.cpf,
      birthDate: accessCode.user.birthDate,
      email: accessCode.user.email,
      fullName: accessCode.user.name,
    });
  }

  async confirmCode(body: ConfirmCodeRequestDto): Promise<ConfirmCodeResponseDto> {
    const loggedUser = await this.authDomainService.confirmCode(
      body.cpf,
      body.birthDate,
      body.code,
    );

    const roles: Roles[] = [];

    for (const userRole of loggedUser.roles) {
      const role = MapRoleIdToRole.get(userRole.role);
      if (role) {
        roles.push(role);
      }
    }

    const jwtPayload = loggedUser.toDto(JwtRequestDto, { roles });

    return plainToInstance(ConfirmCodeResponseDto, {
      accessToken: this.jwtService.sign(instanceToPlain(jwtPayload), {
        subject: loggedUser.id,
      }),
      fullName: loggedUser.name,
      cpf: loggedUser.cpf,
      birthDate: loggedUser.birthDate,
      email: loggedUser.email,
      phone: loggedUser.phone,
      roles: roles,
    });
  }
}
