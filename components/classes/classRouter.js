const express = require("express");
const router = express.Router();
const classController = require("./classController");
const { authenticateByJwt } = require("../auth/auth.services");

/* GET users listing. */
// router.get("/test/:id", authenticateByJwt, createDataSample); //classController.test
router.get("/", authenticateByJwt, classController.getAllClasses);
router.post("/", authenticateByJwt, classController.createAClass);
router.get("/:id", authenticateByJwt, classController.getAClass);
router.put("/:id", authenticateByJwt, classController.updateAClass);
router.delete("/:id", authenticateByJwt, classController.deleteAClass);
router.get(
  "/:id/people",
  authenticateByJwt,
  classController.getAllPeopleInClass
);
router.get(
  "/:id/get-student-join-link",
  authenticateByJwt,
  classController.getStudentJoinLink
);
router.get(
  "/:id/get-teacher-join-link",
  authenticateByJwt,
  classController.getTeacherJoinLink
);
router.get("/:id/join", authenticateByJwt, classController.joinUserToAClass);
router.post(
  "/:id/invite-teachers",
  authenticateByJwt,
  classController.inviteTeachersToAClass
);
router.post(
  "/:id/invite-students",
  authenticateByJwt,
  classController.inviteStudentsToAClass
);
router.get(
  "/:id/accept-invitation",
  authenticateByJwt,
  classController.joinTeacherToAClass
);
router.get(
  "/:id/grade-structure",
  authenticateByJwt,
  classController.getClassGradeStructure
);
router.post(
  "/:id/grade-structure",
  authenticateByJwt,
  classController.createAClassGradeStructure
);
router.put(
  "/:id/grade-structure",
  authenticateByJwt,
  classController.updateAClassGradeStructure
);
router.delete(
  "/:id/grade-structure/:gradeStructureId",
  authenticateByJwt,
  classController.deleteAClassGradeStructure
);
router.get(
  "/:id/reorder-grade-structure",
  authenticateByJwt,
  classController.reOrderGradeStructure
);

module.exports = router;
