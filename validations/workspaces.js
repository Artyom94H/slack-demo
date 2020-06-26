const Joi = require('@hapi/joi');

const schemas = {
  create: {
    body: Joi.object({
      userId: Joi.number()
        .max(80)
        .required(),
      name: Joi.string()
        .required(),
      subDomain: Joi.string()
        .min(3)
        .max(80)
        .required(),
    }),
    query: {},
    params: {},
  },
  put: {
    body: Joi.object({
      userId: Joi.number(),
      name: Joi.string(),
      subDomain: Joi.string(),
    }),
    query: {},
    params: {
      id: Joi.string().required(),
    },
  },
};

module.exports = schemas;
