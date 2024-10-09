import * as Joi from 'joi';

export const DatabaseSchema = Joi.object({
  DB_HOST: Joi.alternatives()
    .try(Joi.string().domain().allow('localhost'), Joi.string().ip())
    .default('localhost'),
  DB_PORT: Joi.number().port().default(3306),
  DB_NAME: Joi.string(),
  DB_USERNAME: Joi.string(),
  DB_PASSWORD: Joi.string(),
  DB_TIMEZONE: Joi.string().default('+00:00'),
  DB_LOGGING: Joi.boolean().default(true),
  DB_SYNCHRONIZE: Joi.boolean().default(true),
  DB_AUTO_LOAD_MODELS: Joi.boolean().default(true),
  DB_ALWAYS_MIGRATE: Joi.boolean().default(true),
  DB_ALWAYS_SEED: Joi.boolean().default(true),
  DB_REVERT_MIGRATIONS_TO: Joi.string().default(''),
  DB_REVERT_SEEDS_TO: Joi.string().default(''),
});
