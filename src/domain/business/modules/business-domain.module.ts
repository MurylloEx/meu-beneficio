import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import { S4eModule } from './s4e.module';
import { MailModule } from './mail.module';

@Module({
  imports: [AuthModule, UserModule, S4eModule, MailModule],
  exports: [AuthModule, UserModule, S4eModule, MailModule],
})
export class BusinessDomainModule {}
