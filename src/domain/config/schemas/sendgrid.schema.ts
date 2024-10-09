import * as Joi from 'joi';

export const SendgridSchema = Joi.object({
  SENDGRID_SENDER: Joi.string().email().required(),
  SENDGRID_API_KEY: Joi.string().required(),
});
