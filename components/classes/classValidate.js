const Joi = require("@hapi/joi");

exports.validateCreateClass = (data) => {
  const Class = {
    className: Joi.string().min(1).max(255).required(),
    classSection: Joi.string().max(255).required(),
    subject: Joi.string().max(255).required(),
    room: Joi.string().max(255),
  };
  return Joi.validate(data, Class);
};

exports.validateInvitation = (data) => {
  const emails = {
    emails: Joi.array().required(),
  };
  return Joi.validate(data, emails);
};
