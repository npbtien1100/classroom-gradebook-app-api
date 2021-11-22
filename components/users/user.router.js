const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  confirmRegistration,
  forgetPassword,
  resetPassword,
  dashboard,
  updateUserInfor,
  changePassword,
} = require("./user.controller");

router.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  dashboard
);

router.post(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  updateUserInfor
);

router.post(
  "/change-password",
  passport.authenticate("jwt", { session: false }),
  changePassword
);

router.get("/confirm-registration", confirmRegistration);
router.post("/forget-password", forgetPassword);
router.post("/reset-password", resetPassword);
router.get("/reset-password", (req, res) => {
  const { email, code } = req.query;
  res.render("resetpassword", { title: "Reset password", email, code });
});
//router.get("/create-data-sample", createDataSample);
module.exports = router;
