const Class = require("../../classes/classModel");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../../config/db.config");
const GradeReviews = require("../gradeReviews/gradeReviewsModel");
const User = require("../../users/use.model");

class GradeReviewComments extends Model {}
GradeReviewComments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: DataTypes.TEXT,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
    },
    gradeReviewId: {
      type: DataTypes.INTEGER,
      references: {
        model: GradeReviews,
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "GradeReviewComments",
  }
);
User.hasMany(GradeReviewComments, {
  foreignKey: "userId",
});
GradeReviewComments.belongsTo(User, {
  foreignKey: "userId",
});

GradeReviews.hasMany(GradeReviewComments, {
  foreignKey: "gradeReviewId",
});
GradeReviewComments.belongsTo(GradeReviews, {
  foreignKey: "gradeReviewId",
});

module.exports = GradeReviewComments;
