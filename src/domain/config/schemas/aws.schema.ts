import * as Joi from 'joi';

export const AwsSchema = Joi.object({
  AWS_DEFAULT_REGION: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
});
