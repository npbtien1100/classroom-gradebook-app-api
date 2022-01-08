const express = require("express");
const router = express.Router();
const NotificationController = require("./notificationsContoller");

router.get("/test", (req, res) => {
  res.send("Test");
});
//router.post("/", NotificationController);

module.exports = router;
