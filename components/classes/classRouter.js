const express = require("express");
const router = express.Router();
const classController = require("./classController");
const { authenticateByJwt } = require("../auth/auth.services");

/* GET users listing. */
router.get("/test/:id", authenticateByJwt, classController.test);
router.get("/", authenticateByJwt, classController.getAllClasses);
router.post("/", authenticateByJwt, classController.createAClass);
router.get("/create-data-sample", classController.createDataSample);
router.get("/:id", authenticateByJwt, classController.getAClass);
router.put("/:id", authenticateByJwt, classController.updateAClass);
router.delete("/:id", authenticateByJwt, classController.deleteAClass);
router.get(
  "/:id/people",
  authenticateByJwt,
  classController.getAllPeopleInClass
);
router.get("/:id/join", authenticateByJwt, classController.joinStudentToAClass);
router.get(
  "/:id/invite-teacher",
  authenticateByJwt,
  classController.inviteTeacherToAClass
);
router.get(
  "/:id/accept-invitation",
  authenticateByJwt,
  classController.joinTeacherToAClass
);

module.exports = router;
