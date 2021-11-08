const express = require("express");
const router = express.Router();
const {
  checkAuthenticated,
  checkNotAuthenticated,
} = require("../auth/auth.service");
const {
  register,
  confirmRegistration,
  forgetPassword,
  resetPassword,
  dashboard,
} = require("./user.controller");

// console.log(checkAuthenticated);
router.get("/", checkAuthenticated, dashboard);
router.post("/", checkNotAuthenticated, register);
router.get("/confirm-registration", confirmRegistration);
router.get("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
