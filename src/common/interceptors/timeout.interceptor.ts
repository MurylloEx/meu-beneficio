import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { catchError, Observable, throwError, timeout, TimeoutError } from 'rxjs';

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';

import { AopBehavior } from 'src/common/types';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TimeoutInterceptor.name);

  constructor(protected readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isMarkedToAllow = this.reflector.getAllAndOverride<boolean>(
      AopBehavior.AllowTooLongRequest,
      [context.getHandler(), context.getClass()],
    );

    if (isMarkedToAllow) {
      return next.handle();
    }

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    return next.handle().pipe(
      timeout(25000),
      catchError((error: Error) => {
        if (error instanceof TimeoutError) {
          this.logger.warn(
            `One request took too long to complete for route [${request.url}]`,
          );
          return throwError(
            () => new RequestTimeoutException('Request took too long to respond!'),
          );
        }

        return throwError(() => error);
      }),
    );
  }
}
