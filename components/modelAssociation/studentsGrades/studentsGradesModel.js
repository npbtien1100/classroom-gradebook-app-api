const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../../config/db.config");
const ClassesGradeStructure = require("../classesGradeStructure/classesGradeStructureModel");
const StudentsClasses = require("../studentsClasses/studentsClassesModel");

class StudentsGrades extends Model {}
StudentsGrades.init(
  {
    studentsClasses_id: {
      type: DataTypes.INTEGER,
      references: {
        model: StudentsClasses,
        key: "id",
      },
    },
    gradeStructure_id: {
      type: DataTypes.INTEGER,
      references: {
        model: ClassesGradeStructure,
        key: "id",
      },
    },
    grade: {
      type: DataTypes.FLOAT,
    },
    finalizedGrade: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    modelName: "studentsGrades",
  }
);
StudentsClasses.belongsToMany(ClassesGradeStructure, {
  through: StudentsGrades,
  foreignKey: "studentsClasses_id",
});
ClassesGradeStructure.belongsToMany(StudentsClasses, {
  through: StudentsGrades,
  foreignKey: "gradeStructure_id",
});

module.exports = StudentsGrades;
