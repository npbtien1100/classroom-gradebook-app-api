const Class = require("../../classes/classModel");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../../config/db.config");

class ClassesGradeStructure extends Model {}
ClassesGradeStructure.init(
  {
    ClassId: {
      type: DataTypes.INTEGER,
      references: {
        model: Class,
        key: "id",
      },
    },
    index: {
      type: DataTypes.INTEGER,
    },
    gradeTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gradeDetail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "classesGradeStructure",
  }
);

ClassesGradeStructure.belongsTo(Class, {
  foreignKey: "ClassId",
  onDelete: "SET NULL",
});
Class.hasMany(ClassesGradeStructure, {
  as: "gradeStructure",
  foreignKey: "ClassId",
});

module.exports = ClassesGradeStructure;