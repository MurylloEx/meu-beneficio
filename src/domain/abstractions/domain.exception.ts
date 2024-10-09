import { HttpException } from '@nestjs/common';

export class DomainException extends HttpException {
  override getResponse(): Record<string, object | string> {
    return {
      name: super.name,
      message: super.getResponse(),
    };
  }
}
