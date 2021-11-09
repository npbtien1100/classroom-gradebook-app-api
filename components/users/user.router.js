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

router.get("/dashboard", checkAuthenticated, dashboard);
router.post("/", checkNotAuthenticated, register);
router.get("/confirm-registration", confirmRegistration);
router.get("/forget-password", checkNotAuthenticated, forgetPassword);
router.post("/reset-password", checkNotAuthenticated, resetPassword);

module.exports = router;
