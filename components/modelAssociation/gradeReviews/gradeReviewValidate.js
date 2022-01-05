const Joi = require("@hapi/joi");
const { joinStudentToAClass } = require("../../classes/classService");

const gradeReviewValidate = (data) => {
  const gradeReview = {
    studentGrade_Id: Joi.number().required(),
    expectedGrade: Joi.number().required(),
    studentExplanation: Joi.string().required(),
  };
  return Joi.validate(data, gradeReview);
};

exports.gradeReviewValidate = gradeReviewValidate;

const gradeReviewCommentValidate = (data) => {
  const gradeReviewComment = {
    userId: Joi.number().required(),
    gradeReviewId: Joi.number().required(),
    content: Joi.string().required(),
  };
  return Joi.validate(data, gradeReviewComment);
};

exports.gradeReviewCommentValidate = gradeReviewCommentValidate;
