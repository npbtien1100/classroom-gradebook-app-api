const Class = require("../../classes/classModel");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../../config/db.config");
const User = require("../../users/use.model");

class StudentsClasses extends Model {}
StudentsClasses.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "studentInClass",
    },
    fullName: {
      type: DataTypes.STRING,
    },
    ClassId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "studentInClass",
      references: {
        model: Class,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "studentsClasses",
  }
);

StudentsClasses.belongsTo(Class, {
  foreignKey: "ClassId",
  onDelete: "CASCADE",
});
Class.hasMany(StudentsClasses, {
  as: "importedStudent",
  foreignKey: "ClassId",
});
StudentsClasses.belongsTo(User, {
  targetKey: "id",
  foreignKey: "student_id",
  constraints: false,
});
module.exports = StudentsClasses;
