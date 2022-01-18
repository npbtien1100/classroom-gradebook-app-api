const Class = require("../../classes/classModel");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../../config/db.config");
const StudentsGrades = require("../studentsGrades/studentsGradesModel");

class GradeReviews extends Model {}
GradeReviews.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    studentGrade_Id: {
      type: DataTypes.INTEGER,
    },
    expectedGrade: {
      type: DataTypes.FLOAT,
    },
    studentExplanation: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "gradereviews",
  }
);

GradeReviews.belongsTo(StudentsGrades, {
  foreignKey: "studentGrade_Id",
  onDelete: "cascade",
});

StudentsGrades.hasOne(GradeReviews, {
  foreignKey: "studentGrade_Id",
  onDelete: "cascade",
});

module.exports = GradeReviews;
