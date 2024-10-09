import * as Joi from 'joi';

export const S4eSchema = Joi.object({
  S4E_API_URL: Joi.string().uri().required(),
  S4E_API_KEY: Joi.string().required(),
});
