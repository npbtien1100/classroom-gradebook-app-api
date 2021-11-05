const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/db.config");

class Class extends Model {}
Class.init(
  {
    className: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    classSection: {
      type: DataTypes.STRING,
    },
    subject: {
      type: DataTypes.STRING,
    },
    room: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Class",
  }
);

// the defined model is the class itself
// console.log(Class === sequelize.models.Class); // true

exports.createClass = async (req) => {
  const { className, classSection, subject, room } = req.body;
  try {
    await Class.create({ className, classSection, subject, room });
    return { message: "Create class successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while creating Class!",
    };
  }
};
exports.getOneClassByID = async (classID, arrayAttributes) => {
  try {
    const foundClass = await Class.findOne({
      where: { id: classID },
      attributes: arrayAttributes,
    });
    return foundClass;
  } catch (error) {
    console.error(error);
  }
};
exports.getAllClasses = async (arrayAttributes, options) => {
  try {
    const { orderOption } = options;
    const allClasses = await Class.findAll({ attributes: arrayAttributes, order: orderOption });
    return allClasses;
  } catch (error) {
    console.error(error);
  }
};
exports.updateAClass = async (classID, attributeObject) => {
  try {
    await Class.update(attributeObject, { where: { id: classID } });
    return { message: "Update class successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while updating Class!",
    };
  }
};
exports.deleteAClass = async (classID) => {
  try {
    await Class.destroy({ where: { id: classID } });
    return { message: "Delete class successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while deleting Class!",
    };
  }
};
