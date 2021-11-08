const Joi = require("@hapi/joi");

const validateCreateClass = (data) => {
  const Class = {
    className: Joi.string().min(1).max(255).required(),
    classSection: Joi.string().max(255).required(),
    subject: Joi.string().max(255).required(),
    room: Joi.string().max(255),
  };
  return Joi.validate(data, Class);
};

module.exports.validateCreateClass = validateCreateClass;
