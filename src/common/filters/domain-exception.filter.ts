import { snakeCase } from 'lodash';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { Catch, ArgumentsHost, ExceptionFilter, Logger } from '@nestjs/common';

import { DomainException } from 'src/domain';

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter<DomainException> {
  private readonly logger = new Logger('Domain Exception');

  constructor(protected readonly reflector: Reflector) {}

  getExceptionName(exception: DomainException) {
    return snakeCase('Status' + exception.name).toLowerCase();
  }

  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const payload = <Record<string, object>>exception.getResponse();

    this.logger.warn(this.getExceptionName(exception) + ' ' + exception.message);

    delete payload.statusCode;

    return response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      error: true,
      status: status,
      code: this.getExceptionName(exception),
      response: payload,
    });
  }
}
