import { snakeCase } from 'lodash';
import { Reflector } from '@nestjs/core';
import { Request, Response } from 'express';
import {
  Catch,
  HttpException,
  ArgumentsHost,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  private readonly logger = new Logger('Http Exception');

  constructor(protected readonly reflector: Reflector) {}

  getExceptionName(exception: HttpException) {
    return snakeCase('StatusHttp' + exception.name).toLowerCase();
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const payload = <Record<string, object>>exception.getResponse();

    this.logger.debug(this.getExceptionName(exception) + ' ' + exception.message);

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
