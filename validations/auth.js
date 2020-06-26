const Joi = require('@hapi/joi');

const schemas = {
  signUp: {
    body: Joi.object({
      fullName: Joi.string()
        .max(80)
        .required(),
      email: Joi.string()
        .email().
        required(),
      password: Joi.string()
        .min(3)
        .max(30)
        .required(),
    }),
    query: {},
    params: {},
  },
  signIn: {
    body: Joi.object({
      email: Joi.string().email().max(256).required().label('Email'),
      password: Joi.string().min(3).max(30).required().label('Password'),
      subDomain: Joi.string(),
    }),
    query: {},
    params: {},
  },
};

module.exports = schemas;
