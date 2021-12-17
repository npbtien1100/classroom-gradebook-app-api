const express = require("express");
const router = express.Router();
const passport = require("passport");
const StudentsGradesController = require("./studentsGradeController");
const { authenticateByJwt } = require("../../auth/auth.services");

//router.get("/create-data-sample", createDataSample);

router.post("/", StudentsGradesController.CreateOrUpdateStudentGrades);

module.exports = router;
