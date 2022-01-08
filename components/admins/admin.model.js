const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/db.config");

class Admin extends Model {}
Admin.init(
  {
    name: {
      type: DataTypes.STRING,
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
  },
  {
    sequelize,
    modelName: "admin",
  }
);

module.exports = Admin;
