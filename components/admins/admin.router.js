const express = require("express");
const router = express.Router();
const passport = require("passport");
const AdminController = require("./admin.controller");

router.get("/test", (req, res) => {
  res.send("Test");
});
router.post("/", AdminController.createOneAdmin);

module.exports = router;
