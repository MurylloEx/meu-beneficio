import { Request } from 'express';
import { map, Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtRequestDto } from 'src/common/dto';
import { AopBehavior, Authenticated } from 'src/common/types';

@Injectable()
export class AuthorizationGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super(reflector);
  }

  hasAtLeastOneRole(user: JwtRequestDto, desiredRoles: string[]): boolean {
    return desiredRoles.some((reqRole) => user.roles.includes(reqRole));
  }

  validateSecurityRoles(context: ExecutionContext): boolean {
    const allowedRoles = this.reflector.getAllAndOverride<string[]>(
      AopBehavior.AllowSecurityRoles,
      [context.getHandler(), context.getClass()],
    );

    if (!allowedRoles) return true;

    if (context.getType() === 'http') {
      const request = context.switchToHttp().getRequest<Authenticated<Request>>();
      return this.hasAtLeastOneRole(request.user, allowedRoles);
    }

    return false;
  }

  applySecurityRule(
    previousResult: boolean | Promise<boolean> | Observable<boolean>,
    ruleValidator: Function,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isBoolean = typeof previousResult === 'boolean';
    const isPromise = previousResult instanceof Promise;
    const isObservable = previousResult instanceof Observable;

    if (isObservable) {
      return previousResult.pipe(
        map((isAllowed): boolean => isAllowed && ruleValidator()),
      );
    }

    if (isPromise) {
      return previousResult.then((isAllowed): boolean => isAllowed && ruleValidator());
    }

    if (isBoolean) {
      return previousResult && ruleValidator();
    }

    return previousResult;
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return this.applySecurityRule(super.canActivate(context), () =>
      this.validateSecurityRoles(context),
    );
  }

  override handleRequest(error: Error, user: any) {
    if (error || !user) {
      throw error || new UnauthorizedException();
    }

    return user;
  }
}
