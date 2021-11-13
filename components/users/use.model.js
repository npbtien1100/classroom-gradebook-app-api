const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/db.config");

class User extends Model {}
User.init(
  {
    name: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    student_id: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING(300),
      defaultValue: "",
    },
    password: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    isLock: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isVerify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    mailSecretCode: {
      type: DataTypes.STRING,
    },
    registerType: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
