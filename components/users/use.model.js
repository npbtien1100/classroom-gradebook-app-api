const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/db.config");

class User extends Model {}
User.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    student_id: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.STRING(300),
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
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
  },
  {
    sequelize,
    modelName: "User",
  }
);

module.exports = User;
