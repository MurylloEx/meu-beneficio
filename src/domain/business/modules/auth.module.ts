import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import {
  AccessCode,
  AccessCodeRepository,
  AuthDomainService,
} from 'src/domain/business/slices/auth';
import { UserModule } from './user.module';
import { S4eModule } from './s4e.module';
import { MailModule } from './mail.module';

@Module({
  imports: [UserModule, S4eModule, MailModule, SequelizeModule.forFeature([AccessCode])],
  providers: [AccessCodeRepository, AuthDomainService],
  exports: [AuthDomainService],
})
export class AuthModule {}
