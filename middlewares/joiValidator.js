const Boom = require('@hapi/boom');

module.exports = schema => {
  return (req, res, next) => {
    if (!schema) {
      return next();
    }
    try {
      const errors = [];
      Object.keys(schema).forEach(key => {
        if (schema[key].validate) {
          const {
            error,
            value,
          } = schema[key].validate(req[key], { abortEarly: false });
          if (error) {
            const { details } = error;
            const message = details.map(i => ({ msg: i.message, key: i.context.label }));
            errors.push(...message)
          } else {
            req[key] = value;
          }
        }
      });
      if (errors.length > 0) {
        next(Boom.badRequest('Validation error', errors));
      } else {
        next();
      }
    } catch (e) {
      next(Boom.badImplementation(`Joi validator error: ${ e.stack || e } `));
    }
  }
};
