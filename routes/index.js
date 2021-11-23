const express = require("express");
const router = express.Router();
const ValidateServices = require("../components/users/user.validate");
const UserServices = require("../components/users/user.service");
const Util = require("../lib/utils");
const MailServices = require("../components/mailServices/mail.service");
const jwt = require("jsonwebtoken");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/api/register", async function (req, res, next) {
  //Validate Register
  //console.log(req.body);
  let data = req.body;
  const validated = ValidateServices.registerValidate(data);
  if (validated.error != null)
    return res.status(400).json({
      success: false,
      message: validated.error.details[0].message,
    });

  //Check Confirm Password
  if (data.password != data.confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Confirm password is incorrect.",
    });
  }

  //Check Email Exist
  const checkEmailResult = await UserServices.findOneByEmail(data.email);
  console.log(checkEmailResult);
  if (checkEmailResult != null) {
    return res.status(400).json({
      success: false,
      message: "Email has already registered",
    });
  }
  //HashPassword
  const password = data.password;
  data.password = await Util.hashPassword(password);

  //Create key and Send Mail
  data.code = UserServices.makeCode(26);
  data.link =
    process.env.URL_WEB +
    "/api/users/confirm-registration?code=" +
    data.code +
    "&email=" +
    data.email;
  MailServices.sendMailRegister(data);

  //Register new User
  const result = await UserServices.registerUser(data);
  if (result.error) {
    res.status(500).send({
      message: result.error,
    });
    return;
  }

  return res.status(200).json({
    success: true,
    message: result,
  });
});
router.get("/logout", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.post("/api/login", async function (req, res, next) {
  try {
    const data = req.body;
    //Find User In DB
    const user = await UserServices.findOneByEmail(data.email);
    // console.log(user);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "The email you entered is not registered.",
      });
    }
    //Check Register type
    if (user.registerType == "socialLinked") {
      return res.status(400).json({
        success: false,
        message: "Please login with your social account.",
      });
    }
    //Check Password
    console.log("Password " + user.password);
    const isValid = await Util.validPassword(data.password, user.password);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "The password you entered is not correct",
      });
    }
    //Check is verified, is lock
    const isVerified = user.isVerify === true;
    if (!isVerified) {
      return res.status(400).json({
        success: false,
        message: "Your email isn't verified. Please confirm your email.",
      });
    }
    const isLocked = user.isLock === true;
    if (isLocked) {
      return res.status(400).json({
        success: false,
        message: "Your account is locked.",
      });
    }
    //JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: 10000000,
    });
    //res.header("auth-token", token).send(token);

    // const tokenObject = Util.issueJWT(user);
    return res.status(200).json({
      success: true,
      id: user.id,
      token: token,
      expiresIn: 10000000,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
