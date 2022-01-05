const express = require("express");
const router = express.Router();
const passport = require("passport");
const StudentsGradesController = require("./studentsGradeController");
const { authenticateByJwt } = require("../../auth/auth.services");

//router.get("/create-data-sample", createDataSample);

router.post("/", StudentsGradesController.CreateOrUpdateStudentGrades);
router.put("/mark-as-finalized", StudentsGradesController.MakeOneGradeFinalize);
router.put(
  "/mark-all-as-finalized",
  StudentsGradesController.MakeAllGradeFinalize
);
router.put(
  "/mark-as-final-decision",
  StudentsGradesController.MakeAsFinalDecision
);
module.exports = router;
