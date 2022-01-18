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
    modelName: "gradereviewcomments",
  }
);
User.hasMany(GradeReviewComments, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
GradeReviewComments.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

GradeReviews.hasMany(GradeReviewComments, {
  foreignKey: "gradeReviewId",
  onDelete: "CASCADE",
});
GradeReviewComments.belongsTo(GradeReviews, {
  foreignKey: "gradeReviewId",
  onDelete: "CASCADE",
});

module.exports = GradeReviewComments;
