import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DomainModule } from 'src/domain';
import { HttpJwtStrategy } from 'src/common/security';
import { AuthService, ConfigurationService } from 'src/common/services';
import { ConfigurationModule } from './configuration.module';
import { PassportModule } from '@nestjs/passport';

const JwtModuleAsync = JwtModule.registerAsync({
  imports: [ConfigurationModule],
  useFactory: (configService: ConfigurationService) => configService.configureJwt(),
  inject: [ConfigurationService],
});

@Module({
  imports: [DomainModule, PassportModule, JwtModuleAsync],
  exports: [JwtModuleAsync, AuthService],
  providers: [HttpJwtStrategy, AuthService],
})
export class SecurityModule {}
