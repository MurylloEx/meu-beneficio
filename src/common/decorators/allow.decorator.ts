import { SetMetadata } from '@nestjs/common';
import { AopBehavior } from 'src/common/types';
import { Roles } from 'src/common/security';

export const Allow = (...roles: Roles[]) =>
  SetMetadata(AopBehavior.AllowSecurityRoles, roles);
