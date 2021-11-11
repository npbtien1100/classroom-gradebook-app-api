const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  confirmRegistration,
  forgetPassword,
  resetPassword,
  dashboard,
} = require("./user.controller");

router.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  dashboard
);
router.get("/confirm-registration", confirmRegistration);
router.get("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
