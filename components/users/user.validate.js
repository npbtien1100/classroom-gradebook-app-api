const Joi = require("@hapi/joi");

const registerValidate = (data) => {
  const user = {
    email: Joi.string().max(255).email().required(),
    password: Joi.string().min(6).max(255).required(),
    confirmPassword: Joi.string().max(255).required(),
    name: Joi.string().max(255).required(),
    phone: Joi.number(),
  };
  return Joi.validate(data, user);
};

const loginValidate = (data) => {
  const user = {
    email: Joi.string().max(255).email().required(),
    password: Joi.string().max(255).required(),
  };
  return Joi.validate(data, user);
};
module.exports.registerValidate = registerValidate;
module.exports.loginValidate = loginValidate;
