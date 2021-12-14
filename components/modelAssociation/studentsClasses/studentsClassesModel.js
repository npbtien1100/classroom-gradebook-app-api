const Class = require("../../classes/classModel");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../../config/db.config");

class StudentsClasses extends Model {}
StudentsClasses.init(
  {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
    },
    ClassId: {
      type: DataTypes.INTEGER,
      primaryKey:true,
      references: {
        model: Class,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "studentsclasses",
  }
);

StudentsClasses.belongsTo(Class, {
  foreignKey: "ClassId",
});
Class.hasMany(StudentsClasses, {
  as: "importedStudent",
  foreignKey: "ClassId",
});

module.exports = StudentsClasses;
