const Class = require("../../classes/classModel");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../../config/db.config");

class ClassesInviteCodes extends Model {}
ClassesInviteCodes.init(
  {
    ClassId: {
      type: DataTypes.INTEGER,
      references: {
        model: Class,
        key: "id",
      },
    },
    inviteTeacherCode: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
  },
  {
    sequelize,
    modelName: "classesinvitecodes",
    paranoid: true,
  }
);

ClassesInviteCodes.belongsTo(Class);
Class.hasMany(ClassesInviteCodes, { as: "inviteTeacherCode" });

module.exports = ClassesInviteCodes;
