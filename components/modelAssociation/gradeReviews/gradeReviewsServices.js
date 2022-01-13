const GradeReviews = require("./gradeReviewsModel");
const GradeReviewComments = require("../gradeReviewComments/gradeReviewCommentsModel");
const User = require("../../users/use.model");
const StudentsClasses = require("../studentsClasses/studentsClassesModel");
const StudentsGrades = require("../studentsGrades/studentsGradesModel");
const ClassGradeStructure = require("../classesGradeStructure/classesGradeStructureModel");
const ClassesGradeStructure = require("../classesGradeStructure/classesGradeStructureModel");
const { Sequelize } = require("sequelize");
const {
  findStudentByStudentGrades,
} = require("../studentsGrades/studentsGradesServices");
const usersClassesServices = require("../usersClasses/usersClassesServices");
const NotificationServices = require("../notifications/notificationsServices");
const classServices = require("../../classes/classService");

module.exports.createNewComment = async (data, req) => {
  try {
    const result = await GradeReviewComments.create(data);
    //Notifi for student for student
    const studentGradeReview = await GradeReviews.findOne({
      where: {
        id: data.gradeReviewId,
      },
    });
    console.log({ studentGradeReview });
    //Find student
    const found = await findStudentByStudentGrades(
      studentGradeReview.studentGrade_Id
    );
    const check = await usersClassesServices.checkIsTeacherOfAClass(
      found[0].ClassId,
      req.user
    );
    if (!check) {
      return result;
    }
    const foundClass = await classServices.getOneClassByClassID(
      found[0].ClassId
    );
    //Notify
    const content = {
      class_id: found[0].ClassId,
      content:
        "You have a comment in :  " +
        found[0].classesGradeStructures.gradeTitle +
        " in class " +
        foundClass.className,
    };
    console.log({ content });
    await NotificationServices.CreateNotificationByStudentId(
      found[0].student_id,
      content
    );
    return result;
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
  }
};
module.exports.createGradeReview = async (data) => {
  try {
    const gradeReview = await this.findOneByStudentGradeId(
      data.studentGrade_Id
    );
    //console.log(gradeReview);
    if (gradeReview == null) {
      const gradeReview = await GradeReviews.create(data);
      //Notify for teacher
      const studentGrade_Id = data.studentGrade_Id;
      const found = await this.findOneStudentGrade(studentGrade_Id);
      await NotificationServices.CreateNotificationForTeacher(found[0]);
      return gradeReview;
    }
    return "Grade review has already created";
  } catch (error) {
    console.log(error);
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
      nest: true,
      raw: true,
    });
    return result;
  } catch (error) {
    console.log(error);
    return { success: false, message: error };
  }
};
