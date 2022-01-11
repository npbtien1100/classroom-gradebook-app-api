const Util = require("../../lib/utils");
const { createJWT } = require("../auth/auth.services");
const adminService = require("./admin.service");
const adminValidator = require("./admin.validate");

exports.getAllAdmins = async (req, res) => {
  try {
    const result = await adminService.getAllAdmins();
    if (result.error) {
      res.status(500).send({
        message: result.error,
      });
      return;
    }
    res.send(result);
  } catch (error) {
    res.status(error.status || 501).json({ message: error.message });
  }
};
exports.createAnAdmin = async (req, res) => {
  let data = req.body;
  const validated = adminValidator.validateCreateAdmin(data);
  if (validated.error != null)
    return res.status(400).send(validated.error.details[0].message);

  //Check Email Exist
  const checkEmailResult = await adminService.findOneByEmail(data.email);
  if (checkEmailResult != null) {
    return res.status(400).json({
      success: false,
      message: "Email has already registered",
    });
  }
  //HashPassword
  const password = data.password;
  data.password = await Util.hashPassword(password);

  //Create new admin
  const result = await adminService.createAnAdmin(data);
  if (result.error) {
    res.status(500).send({
      message: result.error,
    });
    return;
  }
  return res.status(200).json(result);
};
exports.getAnAdmin = async (req, res) => {
  try {
    const result = await adminService.getAnAdmin(req.params.adminId);
    if (result.error) {
      res.status(500).send({
        message: result.error,
      });
      return;
    }
    res.send(result);
  } catch (error) {
    res.status(error.status || 501).json({ message: error.message });
  }
};
exports.updateAnAdmin = async (req, res) => {
  try {
    //Validate admin
    const validated = adminValidator.validateUpdateAdmin(req.body);
    if (validated.error != null)
      return res.status(400).send(validated.error.details[0].message);
    // update admin
    const result = await adminService.updateAnAdmin(
      req.params.adminId,
      req.body
    );
    if (result.error) {
      res.status(500).send({
        message: result.error,
      });
      return;
    }
    res.json(result);
  } catch (error) {
    res.status(error.status || 501).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const result = await adminService.getAllUsers();
    if (result.error) {
      res.status(500).send({
        message: result.error,
      });
      return;
    }
    res.send(result);
  } catch (error) {
    res.status(error.status || 501).json({ message: error.message });
  }
};
exports.getAUser = async (req, res) => {
  try {
    const result = await adminService.getAUser(req.params.userId);
    if (result.error) {
      res.status(500).send({
        message: result.error,
      });
      return;
    }
    res.send(result);
  } catch (error) {
    res.status(error.status || 501).json({ message: error.message });
  }
};
exports.updateAUser = async (req, res) => {
  try {
    //Validate user
    const validated = adminValidator.validateUpdateUser(req.body);
    if (validated.error != null)
      return res.status(400).send(validated.error.details[0].message);
    // update user
    const result = await adminService.updateAUser(req.params.userId, req.body);
    if (result.error) {
      res.status(500).send({
        message: result.error,
      });
      return;
    }
    res.json(result);
  } catch (error) {
    res.status(error.status || 501).json({ message: error.message });
  }
};

exports.getAllClasses = async (req, res) => {
  try {
    const result = await adminService.getAllClasses();
    if (result.error) {
      res.status(500).send({
        message: result.error,
      });
      return;
    }
    res.send(result);
  } catch (error) {
    res.status(error.status || 501).json({ message: error.message });
  }
};
exports.getAClass = async (req, res) => {
  try {
    const result = await adminService.getAClass(req.params.classId);
    if (result.error) {
      res.status(500).send({
        message: result.error,
      });
      return;
    }
    res.send(result);
  } catch (error) {
    res.status(error.status || 501).json({ message: error.message });
  }
};

exports.getTotalReport = async (req, res) => {
  try {
    const result = await adminService.getTotalReport();
    if (result.error) {
      res.status(500).send({
        message: result.error,
      });
      return;
    }
    res.send(result);
  } catch (error) {
    res.status(error.status || 501).json({ message: error.message });
  }
};

exports.handleLogin = async (req, res) => {
  try {
    const data = req.body;
    const user = await adminService.findOneByEmail(data.email);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "The email you entered is not registered.",
      });
    }
    //Check Password
    const isValid = await Util.validPassword(data.password, user.password);
    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "The password you entered is not correct",
      });
    }
    //JWT
    const token = createJWT({ id: user.id });
    const returnObject = {
      success: true,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
      token: token,
      expiresIn: 10000000,
    };
    res.json(returnObject);
  } catch (error) {
    console.log(error);
  }
};
