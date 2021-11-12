const express = require("express");
const router = express.Router();
const passport = require("passport");
const { checkAuthenticated, checkNotAuthenticated } = require("./auth.service");

router.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", { failureRedirect: "/api/auth/failure" }),
  function (req, res) {
    res.send({ message: "Login success", user: req.user });
  }
);

router.get(
  "/google",
  checkNotAuthenticated,
  passport.authenticate("google", { scope: ["profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/api/auth/failure" }),
  function (req, res) {
    res.send({ message: "Login success", user: req.user });
  }
);

router.get(
  "/facebook",
  checkNotAuthenticated,
  passport.authenticate("facebook")
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/api/auth/failure" }),
  function (req, res) {
    res.send({ message: "Login success", user: req.user });
  }
);

router.get("/failure", (req, res) => {
  res.json({ message: "Login fail" });
});

router.get("/logout", checkAuthenticated, (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.send({ message: "Logout Success" });
});

module.exports = router;
