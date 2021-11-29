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
exports.validateCreateClassGradeStructure = (data) => {
  const gradeStructure = Joi.array().required().items(
    Joi.object({
      gradeTitle: Joi.string().max(255).required(),
      gradeDetail: Joi.string().max(255).required(),
    })
  );
  return Joi.validate(data, gradeStructure);
};
exports.validateReorderClassGradeStructure = (data) => {
  const query = {
    srcIndex: Joi.number().required(),
    desIndex: Joi.number().required(),
  };
  return Joi.validate(data, query);
};
exports.validateUpdateClassGradeStructure = (data)=>{
  const gradeStructure = Joi.array().required().items(
    Joi.object({
      id: Joi.number().optional(),
      gradeTitle: Joi.string().max(255).required(),
      gradeDetail: Joi.string().max(255).required(),
    })
  );
  return Joi.validate(data, gradeStructure);
}