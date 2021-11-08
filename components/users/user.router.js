const express = require("express");
const router = express.Router();
const {
  register,
  confirmRegistration,
  forgetPassword,
  resetPassword,
} = require("./user.controller");

router.post("/", register);
router.get("/confirm-registration", confirmRegistration);
router.get("/forget-password", forgetPassword);
router.get("/reset-password", resetPassword);

module.exports = router;
