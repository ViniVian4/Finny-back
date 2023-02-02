import Joi from 'joi';

export const newTransactionSchema = Joi.object({
  name: Joi.string().min(1).max(25).required(),
  value: Joi.number().min(0).required(),
  date: Joi.string().min(1).max(10).required(),
  installments: Joi.number().min(1).required(),
  type: Joi.string().required(),
  customTypeName: Joi.string().min(1).max(20).required()
});