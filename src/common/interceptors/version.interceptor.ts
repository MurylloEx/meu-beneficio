import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { compare } from 'compare-versions';

import {
  CallHandler,
  ExecutionContext,
  GoneException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { ConfigurationService } from 'src/common/services';
import { AopBehavior } from 'src/common/types';

@Injectable()
export class VersionInterceptor implements NestInterceptor {
  constructor(
    protected readonly configurationService: ConfigurationService,
    protected readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isMarkedToIgnore = this.reflector.getAllAndOverride<boolean>(
      AopBehavior.IgnoreAppVersion,
      [context.getHandler(), context.getClass()],
    );

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const clientVersion = request.get('x-app-version') ?? '0.0.0';
    const clientRequiredVersion =
      this.configurationService.getConfigurations().app.minimumVersion;

    if (isMarkedToIgnore || compare(clientVersion, clientRequiredVersion, '>=')) {
      return next.handle();
    }

    throw new GoneException('Your application version is outdated.');
  }
}
