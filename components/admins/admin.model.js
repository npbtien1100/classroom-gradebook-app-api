const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/db.config");

class Admin extends Model {}
Admin.init(
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "admin",
  }
);

module.exports = Admin;
