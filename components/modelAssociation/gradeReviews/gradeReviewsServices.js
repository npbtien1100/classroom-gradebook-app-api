const GradeReviews = require("./gradeReviewsModel");
const GradeReviewComments = require("../gradeReviewComments/gradeReviewCommentsModel");
const User = require("../../users/use.model");
const StudentsClasses = require("../studentsClasses/studentsClassesModel");
const StudentsGrades = require("../studentsGrades/studentsGradesModel");
const ClassGradeStructure = require("../classesGradeStructure/classesGradeStructureModel");
const ClassesGradeStructure = require("../classesGradeStructure/classesGradeStructureModel");
const { Sequelize } = require("sequelize");

module.exports.createGradeReview = async (data) => {
  try {
    const gradeReview = await this.findOneByStudentGradeId(
      data.studentGrade_Id
    );
    //console.log(gradeReview);
    if (gradeReview == null) {
      const gradeReview = await GradeReviews.create(data);
      return gradeReview;
    }
    return "Grade review has already created";
  } catch (error) {
    //console.log(error);
    return { success: false, message: error };
  }
};

module.exports.findOneByStudentGradeId = async (studentGrade_Id) => {
  try {
    //console.log(studentGrade_Id);
    const gradeReview = await GradeReviews.findOne({
      where: {
        studentGrade_Id: studentGrade_Id,
      },
      raw: true,
    });
    return gradeReview;
  } catch (error) {
    //console.log(error);
    return { success: false, message: error };
  }
};

module.exports.findOneGradeReviewWithComments = async (studentGrade_Id) => {
  try {
    console.log({ studentGrade_Id });
    const gradeReview = await GradeReviews.findAll({
      include: { model: GradeReviewComments, include: User },
      where: {
        studentGrade_Id: studentGrade_Id,
      },
      order: [["GradeReviewComments", "createdAt", "ASC"]],
      raw: true,
      nest: true,
    });
    return gradeReview;
  } catch (error) {
    //console.log(error);
    return { success: false, message: error };
  }
};

module.exports.createNewComment = async (data) => {
  try {
    const result = await GradeReviewComments.create(data);
    return result;
  } catch (error) {
    //console.log(error);
    return { success: false, message: error };
  }
};

module.exports.getAllStudentGradeOfOneClass = async (classId) => {
  try {
    const result = ClassesGradeStructure.findAll({
      include: {
        model: StudentsClasses,
      },
      where: {
        classId: classId,
      },
      raw: true,
    });
    return result;
  } catch (error) {
    //console.log(error);
    return { success: false, message: error };
  }
};
module.exports.findOneStudentGrade = async (studentGrade_Id) => {
  try {
    const result = await StudentsClasses.findAll({
      include: [
        {
          model: ClassGradeStructure,
          as: "classesGradeStructures",
          where: {
            "$classesGradeStructures.studentsGrades.id$": studentGrade_Id,
          },
        },
      ],
    });
    return result;
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
  }
};
