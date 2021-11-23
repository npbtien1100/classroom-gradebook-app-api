const Joi = require("@hapi/joi");

exports.validateCreateClass = (data) => {
  const Class = {
    className: Joi.string().min(1).max(255).required(),
    classSection: Joi.optional(),
    subject: Joi.optional(),
    room: Joi.optional(),
  };
  return Joi.validate(data, Class);
};

exports.validateInvitation = (data) => {
  const emails = {
    emails: Joi.array().required(),
  };
  return Joi.validate(data, emails);
};
