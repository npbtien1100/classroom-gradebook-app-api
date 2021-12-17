const Joi = require("@hapi/joi");

const gradeInputValidate = (data) => {
  const grade = {
    studentsClasses_id: Joi.number(),
    gradeStructure_id: Joi.number(),
    grade: Joi.number().min(0).max(100),
  };
  return Joi.validate(data, grade);
};

exports.gradeInputValidate = gradeInputValidate;
