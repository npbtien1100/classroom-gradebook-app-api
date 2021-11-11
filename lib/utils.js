const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const salt = 10;

const validPassword = async (password, hash) => {
  const res = await bcrypt.compare(password, hash);
  return res;
};

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const issueJWT = (user) => {
  const _id = user._id;

  const expiresIn = "1d";

  const payload = {
    sub: _id,
    iat: Math.floor(Date.now() / 1000),
  };
  //console.log(process.env.JWT_SECRET);
  const signedToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
    algorithm: "RS256",
  });

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
};

// const verifyResetToken = async (token) => {
//   let data;
//   try {
//     data = await jsonwebtoken.verify(token, EMAIL_SECRET);
//     return data;
//   } catch (err) {
//     return err;
//   }
// };

module.exports.validPassword = validPassword;
module.exports.hashPassword = hashPassword;
module.exports.issueJWT = issueJWT;
//module.exports.verifyResetToken = verifyResetToken;
