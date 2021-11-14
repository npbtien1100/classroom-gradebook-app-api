const passport = require("passport");
const authenticateByJwt = require("../auth/auth.services");
const jwt = require("jsonwebtoken");

exports.authenticateByJwt = passport.authenticate("jwt", { session: false });

exports.createJWT = (obj) => {
  const JWT = jwt.sign({ ...obj }, process.env.JWT_SECRET, {
    expiresIn: 10000000, //
  });
  return JWT;
};
