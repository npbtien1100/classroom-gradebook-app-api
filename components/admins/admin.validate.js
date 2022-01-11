const Joi = require("@hapi/joi");

exports.validateCreateAdmin = (data) => {
  const Admin = Joi.object({
    fullName: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.number().optional(),
    address: Joi.string().optional(),
  });
  return Admin.validate(data);
};

exports.validateUpdateAdmin = (data) => {
  const Admin = Joi.object({
    fullName: Joi.string().min(2).max(50).required(),
    phone: Joi.number().optional(),
    address: Joi.string().optional(),
  });
  return Admin.validate(data);
};

exports.validateUpdateUser = (data) => {
  const User = Joi.object({
    studentId: Joi.optional(),
    isLock: Joi.number().optional(),
  });
  return User.validate(data);
};
