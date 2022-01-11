const express = require("express");
const router = express.Router();
const NotificationServices = require("./notificationsServices");
const { authenticateByJwt } = require("../../auth/auth.services");
router.get("/test", async (req, res) => {
  console.log("Oke");
  const result = await NotificationServices.CreateNotificationForTeacher(9);
  res.json(result);
});
router.get("/", authenticateByJwt, async (req, res) => {
  //Get all notification of a people
  //Theo page
  const { page } = req.query;
  const id = req.user.id;
  const result = await NotificationServices.getNotificationsOfStudentByPage(
    id,
    page
  );
  res.json(result);
});
//router.post("/", NotificationController);

module.exports = router;
