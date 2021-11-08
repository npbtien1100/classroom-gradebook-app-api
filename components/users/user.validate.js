const Joi = require("@hapi/joi");

const registerValidate = (data) => {
  const User = {
    email: Joi.string().min(1).max(255).email().required(),
    password: Joi.string().max(255).required(),
    phone: Joi.string(),
    address: Joi.string(),
  };
  return Joi.validate(data, User);
};

module.exports.registerValidate = registerValidate;
