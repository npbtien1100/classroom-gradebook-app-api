const User = require("../../users/use.model");
const Class = require("../../classes/classModel");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../../config/db.config");

class UsersClasses extends Model {}
UsersClasses.init(
  {
    ClassId: {
      type: DataTypes.INTEGER,
      references: {
        model: Class,
        key: "id",
      },
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "usersclasses",
  }
);

Class.belongsToMany(User, { through: UsersClasses, foreignKey: "ClassId" });
User.belongsToMany(Class, { through: UsersClasses, foreignKey: "UserId" });

module.exports = UsersClasses;
