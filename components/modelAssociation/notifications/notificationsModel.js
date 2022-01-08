const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../../config/db.config");
const User = require("../../users/use.model");

class Notification extends Model {}
Notification.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
    },
    class_id: {
      type: DataTypes.INTEGER,
    },
    content: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  },
  {
    sequelize,
    modelName: "Notifications",
  }
);

Notification.belongsTo(User, {
  foreignKey: "user_id",
});
User.hasMany(Notification, {
  foreignKey: "user_id",
});

module.exports = Notification;
