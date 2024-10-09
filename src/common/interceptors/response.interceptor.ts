import { Reflector } from '@nestjs/core';
import { extension } from 'mime-types';
import { Observable, map } from 'rxjs';
import { Request, Response } from 'express';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { AopBehavior } from 'src/common/types';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(protected readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isMarkedToIgnore = this.reflector.getAllAndOverride<boolean>(
      AopBehavior.IgnoreDefaultResponse,
      [context.getHandler(), context.getClass()],
    );

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const acceptExtension = extension(request.get('accept') ?? '') || 'json';

    if (isMarkedToIgnore || acceptExtension != 'json') {
      return next.handle();
    }

    return next.handle().pipe(
      map((payload) => {
        return {
          timestamp: new Date().toISOString(),
          path: request.path,
          error: false,
          status: response.statusCode,
          code: 'status_success',
          response: payload,
        };
      }),
    );
  }
}
