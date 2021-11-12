const bcrypt = require("bcrypt");

const salt = 10;

const validPassword = async (password, hash) => {
  const res = await bcrypt.compare(password, hash);
  return res;
};

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

module.exports.validPassword = validPassword;
module.exports.hashPassword = hashPassword;
