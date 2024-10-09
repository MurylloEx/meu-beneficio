import * as Joi from 'joi';
import { AppSchema } from './app.schema';
import { ServerSchema } from './server.schema';
import { RootSchema } from './root.schema';
import { CacheSchema } from './cache.schema';
import { CompressionSchema } from './compression.schema';
import { DatabaseSchema } from './database.schema';
import { OasSchema } from './oas.schema';
import { SecuritySchema } from './security.schema';
import { AwsSchema } from './aws.schema';
import { S4eSchema } from './s4e.schema';
import { SendgridSchema } from './sendgrid.schema';

export * from './app.schema';
export * from './server.schema';
export * from './root.schema';
export * from './cache.schema';
export * from './compression.schema';
export * from './database.schema';
export * from './oas.schema';
export * from './security.schema';
export * from './aws.schema';
export * from './s4e.schema';
export * from './sendgrid.schema';

export const ConfigSchema = Joi.object()
  .concat(AppSchema)
  .concat(CacheSchema)
  .concat(CompressionSchema)
  .concat(DatabaseSchema)
  .concat(OasSchema)
  .concat(RootSchema)
  .concat(SecuritySchema)
  .concat(ServerSchema)
  .concat(AwsSchema)
  .concat(S4eSchema)
  .concat(SendgridSchema);
