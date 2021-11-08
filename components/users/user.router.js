const express = require("express");
const router = express.Router();
const { register } = require("./user.controller");

router.get("/", (req, res) => {
  const body = req.body;
  console.log({ body });
  res.send("Post thanh cong!");
});

router.post("/", register);

module.exports = router;
