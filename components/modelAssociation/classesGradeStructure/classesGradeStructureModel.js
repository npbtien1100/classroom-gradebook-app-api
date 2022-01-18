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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "classesgradestructures",
  }
);

ClassesGradeStructure.belongsTo(Class, {
  foreignKey: "ClassId",
  onDelete: "CASCADE",
});
Class.hasMany(ClassesGradeStructure, {
  as: "gradeStructure",
  foreignKey: "ClassId",
});

module.exports = ClassesGradeStructure;
