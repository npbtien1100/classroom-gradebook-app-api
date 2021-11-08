const express = require("express");
const router = express.Router();
const passport = require("passport");
const { checkAuthenticated, checkNotAuthenticated } = require("./auth.service");

router.post("/login", checkNotAuthenticated, function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    console.log(err);
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log(info["message"]);
      return res.json(info);
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json({ message: "Login success", user });
    });
  })(req, res, next);
});
router.get("/logout", checkAuthenticated, (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged out");
  res.send({ message: "Logout Success" });
});

module.exports = router;
