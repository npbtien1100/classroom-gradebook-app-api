const { registerValidate } = require("./user.validate");
const {
  registerUser,
  findOneByEmail,
  makeCode,
  updateUser,
} = require("./user.service");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const MailServices = require("../mailServices/mail.service");

exports.confirmRegistration = async (req, res) => {
  const { email, code } = req.query;
  const query = await findOneByEmail(email);
  const user = query.dataValues;
  console.log(user);

  if (code === user.mailSecretCode && !user.isVerify) {
    user.isVerify = true;
    user.mailSecretCode = makeCode(26);
    await updateUser(user.id, user);
    return res.status(200).json({
      success: true,
      message: "Verify Email Success, Now you can use your account",
    });
  }
  // console.log(user.dataValues);
  return res.status(400).json({
    success: false,
    message: "An error occurs when you verify email",
  });
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.body;
  const query = await findOneByEmail(email);
  const user = query.dataValues;

  if (user.isVerify == false)
    return res.status(400).json({
      success: false,
      message: "Please verify your email before",
    });

  user.mailSecretCode = makeCode(26);
  await updateUser(user.id, user);
  user.link =
    process.env.URL_WEB +
    "/api/users/reset-password/?code=" +
    user.mailSecretCode +
    "&email=" +
    user.email;
  MailServices.sendMailForgetPassword(user);

  return res.status(200).json({
    success: true,
    message: "Please check your email to reset your password",
  });
};

exports.resetPassword = async (req, res) => {
  console.log(req.body);
  const { email, code } = req.query;
  const { password, confirmPassword } = req.body;
  console.log(email + code);
  console.log(password + confirmPassword);

  //Check condition password
  if (password != confirmPassword || password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Confirm password is incorrect. Please try again.",
    });
  }

  //Find user check secret code
  const query = await findOneByEmail(email);
  const user = query.dataValues;
  if (user.mailSecretCode != code) {
    return res.status(400).json({
      success: false,
      message: "Secret code is incorrect",
    });
  }

  //Hash Password
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  user.password = hashPassword;
  user.mailSecretCode = makeCode(26);

  await updateUser(user.id, user);
  // console.log(user.dataValues);
  return res.status(200).json({
    success: true,
    message: "Reset Password success",
  });
  //res.json({ message: "Reset Password success" });
};

exports.dashboard = async (req, res) => {
  //return res.json(req.user);
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

exports.updateUserInfor = async (req, res) => {
  const data = req.body;
  updateUser(data.Id, data);
  res.status(200).json({
    success: true,
    message: req.user,
  });
};
exports.changePassword = async (req, res) => {
  let user = req.user.dataValues;
  const { password, confirmPassword } = req.body;
  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must have the length > 6",
    });
  }
  if (password != confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Confirm password is incorrect. Please try again.",
    });
  }
  //Hash Password
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  console.log(user);
  user.password = hashPassword;
  console.log(user);
  await updateUser(user.id, user);
  return res.status(200).json({
    success: true,
    message: "Your password is updated",
  });
};
