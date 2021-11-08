const { registerValidate } = require("./user.validate");
const {
  registerUser,
  findOneByEmail,
  makeCode,
  updateUser,
} = require("./user.service");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const {
  sendMailRegister,
  sendMailForgetPassword,
} = require("../mailServices/mail.service");

exports.register = async (req, res) => {
  //Validate Register
  // console.log(req.body);
  let data = req.body;
  const validated = registerValidate(data);
  if (validated.error != null)
    return res.status(400).send(validated.error.details[0].message);

  //Check Confirm Password
  if (data.password != data.confirmPassword) {
    return res.status(400).send("Password confirm is not correct");
  }

  //Check Email Exist
  const checkEmailResult = await findOneByEmail(data.email);
  console.log(checkEmailResult);
  if (checkEmailResult != null) {
    return res.status(400).send("Email has already registered");
  }
  //HashPassword
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  data.password = hashPassword;

  //Create key and Send Mail
  data.code = makeCode(26);
  //console.log(data.code);
  data.link =
    process.env.URL_WEB +
    "/api/users/confirm-registration?code=" +
    data.code +
    "&email=" +
    data.email;
  sendMailRegister(data);

  //Register new User
  const result = await registerUser(data);
  if (result.error) {
    res.status(500).send({
      message: result.error,
    });
    return;
  }

  res.json(result);
};

exports.confirmRegistration = async (req, res) => {
  const { email, code } = req.query;
  const query = await findOneByEmail(email);
  const user = query.dataValues;
  console.log(user);

  if (code === user.mailSecretCode && !user.isVerify) {
    user.isVerify = true;
    user.mailSecretCode = makeCode(26);
    await updateUser(user.id, user);

    return res.json({
      message: "Verify Email Success, Now you can use your account",
    });
  }
  // console.log(user.dataValues);
  res.json({ message: "Error verify" });
};

exports.forgetPassword = async (req, res) => {
  const { email } = req.query;
  const query = await findOneByEmail(email);
  const user = query.dataValues;

  if (user.isVerify == false)
    return res.json({
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
  sendMailForgetPassword(user);

  res.json({ message: "Please check your email to reset your password" });
};
