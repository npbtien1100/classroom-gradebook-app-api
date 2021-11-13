const express = require("express");
const router = express.Router();
const passport = require("passport");
const { createJWT } = require("./auth.services");

const responseAfterAuthorizing = (req, res, next) => {
  const token = createJWT({ id: req.user.id });
  res.status(200).json({
    success: true,
    user: { id: req.user.id, name: req.user.name, image: req.user.image },
    token: token,
    expiresIn: 10000000,
  });
};

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/api/auth/failure" }),
  function (req, res) {
    res.status(200).send({ message: "Login success", user: req.user });
  }
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/auth/failure",
  }),
  responseAfterAuthorizing
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    authType: "rerequest",
    scope: ["public_profile", "email"],
  })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "/api/auth/failure",
  }),
  responseAfterAuthorizing
);

router.get("/failure", (req, res) => {
  res.status(401).json({ message: "Login failed!" });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.send({ message: "Logout Success" });
});

module.exports = router;
