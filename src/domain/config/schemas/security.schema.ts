import * as Joi from 'joi';

export const SecuritySchema = Joi.object({
  SECURITY_CORS_ORIGIN: Joi.string().default('*'),
  SECURITY_CORS_MAX_AGE: Joi.number().positive().default(600),
  SECURITY_JWT_SYMMETRIC_KEY: Joi.string().default('secret'),
  SECURITY_JWT_IGNORE_EXPIRATION: Joi.boolean().default(true),
  SECURITY_JWT_ISSUER: Joi.string().default('localhost'),
  SECURITY_JWT_EXPIRATION: Joi.string().default('30d'),
});
