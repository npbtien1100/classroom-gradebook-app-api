const sequelize = require("../../config/db.config");
const { Model, DataTypes } = require("sequelize");

class FederatedUser extends Model {}
FederatedUser.init(
  {
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "FederatedUser",
  }
);

module.exports = FederatedUser;
