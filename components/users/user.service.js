const { Model, DataTypes } = require("sequelize");
const sequelize = require("../../config/db.config");

class User extends Model {}
User.init(
  {
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  },
  {
    timestamps: false,
    sequelize,
    modelName: "User",
  }
);

// the defined model is the class itself
// console.log(Class === sequelize.models.Class); // true

exports.registerService = async (data) => {
  console.log(data);
  try {
    await User.create({
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
    });
    return { message: "Register new user successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while creating Class!",
    };
  }
};
