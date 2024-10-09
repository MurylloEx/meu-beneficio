import { applyDecorators, SetMetadata } from '@nestjs/common';
import { AopBehavior } from 'src/common/types';

export const Behavior = (...behaviors: AopBehavior[]) => {
  const decorators = behaviors.map((behavior) => SetMetadata(behavior, true));
  return applyDecorators(...decorators);
};
