const Joi = require("@hapi/joi");

exports.validateStudentList = (data) => {
  const studentList = Joi.array().required().items(
      Joi.object({
        student_id: Joi.string().alphanum().required(),
        fullName: Joi.string().required(),
      })
    );
    return studentList.validate(data,{abortEarly:false});
};

exports.validateAssignmentGrade = (data) => {
  const assignmentGrade = Joi.array().required().items(
    Joi.object({
      student_id: Joi.string().alphanum().required(),
      grade: Joi.number().required(),
    })
  );
  return assignmentGrade.validate(data,{abortEarly:false});
};
