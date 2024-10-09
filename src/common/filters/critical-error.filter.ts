import { snakeCase } from 'lodash';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import { Catch, ArgumentsHost, ExceptionFilter, Logger } from '@nestjs/common';

@Catch(Error)
export class CriticalErrorFilter implements ExceptionFilter<Error> {
  private readonly logger = new Logger('Critical Error');

  constructor(protected readonly reflector: Reflector) {}

  getExceptionName(exception: Error) {
    return snakeCase('StatusCritical' + exception.name).toLowerCase();
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    this.logger.error(
      this.getExceptionName(exception) + ' ' + exception.message,
      exception.stack,
    );

    return response.status(500).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      error: true,
      status: 500,
      code: this.getExceptionName(exception),
      response: {
        name: exception.name,
        message: exception.message,
      },
    });
  }
}
