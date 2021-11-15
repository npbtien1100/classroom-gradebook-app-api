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

exports.customAuthenticateByJwt = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const parseAuthHeader = authHeader ? authHeader.split(" ") : null;
  if (!(parseAuthHeader && parseAuthHeader[0] === "Bearer")) {
    req.user = null;
    next();
  }
  const token = parseAuthHeader[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) res.sendStatus(403);
    req.user = user;
    next();
  });
};
