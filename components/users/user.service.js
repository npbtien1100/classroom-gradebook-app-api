const User = require("./use.model");
// the defined model is the class itself
// console.log(Class === sequelize.models.Class); // true

exports.registerUser = async (data) => {
  //console.log(data);
  try {
    await User.create({
      email: data.email,
      password: data.password,
      phone: data.phone,
      name: data.name,
      mailSecretCode: data.code,
    });
    return { message: "Register new user successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while creating Class!",
    };
  }
};

exports.makeCode = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

exports.findOneByEmail = async (email) => {
  try {
    const foundUser = await User.findOne({
      where: { email: email },
    });
    return foundUser;
  } catch (error) {
    console.error(error);
  }
};

exports.findOneById = async (Id) => {
  try {
    const foundUser = await User.findOne({
      where: { Id: Id },
    });
    return foundUser;
  } catch (error) {
    console.error(error);
  }
};
exports.updateUser = async (userID, attributeObject) => {
  try {
    await User.update(attributeObject, { where: { id: userID } });
    return { message: "Update class successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while updating Class!",
    };
  }
};
