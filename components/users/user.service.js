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
      image: data.image,
    });
    return { message: "Register new user successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while creating User!",
    };
  }
};
exports.googleCreateUser = async (data) => {
  console.log(data);
  try {
    await User.create({
      email: data.email,
      name: data.name,
      image: data.image,
    });
    return { message: "Register new user successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while creating User!",
    };
  }
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
exports.findOrCreateAUser = async (whereCondition, objToCreate) => {
  try {
    const res = await User.findOrCreate({
      where: whereCondition,
      defaults: objToCreate,
    });
    return res;
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
    return { message: "Update user successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while updating User!",
    };
  }
};

exports.createUserByFederatedUser = async (obj) => {
  const { name, image } = obj;
  try {
    const result = await User.create({
      name: name,
      image: image,
    });
    console.log("Trong service: ");
    console.log({ result });
    return result;
  } catch (error) {
    console.error(error);
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
exports.makePhone = (length) => {
  let result = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// exports.createDataSample = async (objArray) => {
//   try {
//     const student_id = 18120513;
//     const userArray = [];
//     const saltArray = await Promise.all(
//       objArray.map((e) => bcrypt.genSalt(10))
//     );
//     const hashPasswordArray = await Promise.all(
//       saltArray.map((e) => bcrypt.hash("123456", e))
//     );
//     objArray.forEach((ele, index) => {
//       const user = {};
//       const { email, name, picture, phone } = ele;
//       user.email = email;
//       user.name = `${name.last} ${name.first}`;
//       user.image = picture.large;
//       user.student_id = student_id + index;
//       user.password = hashPasswordArray[index];
//       user.phone = phone
//       user.isVerify = true;
//       user.mailSecretCode = this.makeCode(26);
//       user.registerType = "registered";
//       userArray.push(user);
//     });
//     await User.bulkCreate(userArray);
//     return userArray;
//   } catch (error) {
//     console.error(error);
//   }
// };
