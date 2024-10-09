import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AppVersion = createParamDecorator((_, ctx: ExecutionContext) => {
  if (ctx.getType() === 'http') {
    const request = ctx.switchToHttp().getRequest<Request>();
    return request.get('x-app-version') || '0.0.0';
  }
  return '0.0.0';
});
