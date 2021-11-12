const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

router.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", { failureRedirect: "/api/auth/failure" }),
  function (req, res) {
    res.status(200).send({ message: "Login success", user: req.user });
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

//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     console.log(req.user);
//     const user = req.user;
//     // Successful authentication, redirect home.
//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//       expiresIn: 10000000,
//     });
//     // const tokenObject = Util.issueJWT(user);
//     res.status(200).json({
//       success: true,
//       id: user.id,
//       token: token,
//       expiresIn: 10000000,
//       message: "Login by google success",
//     });
//     // res.redirect("/");
//   }
// );
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
