import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtRequestDto } from 'src/common/dto';
import { ConfigurationDomainService } from 'src/domain';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class HttpJwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(readonly configuration: ConfigurationDomainService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: configuration.security.jwt.ignoreExpiration,
      secretOrKey: configuration.security.jwt.symmetricKey,
    });
  }

  validate(user: Record<string, string>): JwtRequestDto {
    if (!user.iss || !user.exp) {
      throw new UnauthorizedException('Malformed user payload received.');
    }

    return plainToInstance(JwtRequestDto, user);
  }
}
