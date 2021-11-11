const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

// router.post(
//   "/login",
//   checkNotAuthenticated,
//   passport.authenticate("local", { failureRedirect: "/api/auth/failure" }),
//   function (req, res) {
//     res.status(200).send({ message: "Login success", user: req.user });
//   }
// );

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authorization, Google will redirect the user
//   back to this application at /auth/google/callback
// router.get(
//   "/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// // GET /auth/google/callback
// //   Use passport.authenticate() as route middleware to authenticate the
// //   request.  If authentication fails, the user will be redirected back to the
// //   login page.  Otherwise, the primary route function function will be called,
// //   which, in this example, will redirect the user to the home page.
// router.get(
//   "/google/callback",
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

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
// router.get("/facebook", passport.authenticate("facebook"));

// // Facebook will redirect the user to this URL after approval.  Finish the
// // authentication process by attempting to obtain an access token.  If
// // access was granted, the user will be logged in.  Otherwise,
// // authentication has failed.
// router.get(
//   "/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: "/",
//     failureRedirect: "/failure",
//   })
// );

// router.get("/logout", checkAuthenticated, (req, res) => {
//   req.logout();
//   req.flash("success_msg", "You are logged out");
//   res.status(200).send({ message: "Logout Success" });
// });

module.exports = router;
