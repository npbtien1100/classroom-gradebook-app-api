const express = require("express");
const router = express.Router();
const fileController = require("./fileController");
const { authenticateByJwt } = require("../auth/auth.services");

/* GET users listing. */
// router.get("/test/:id", authenticateByJwt, createDataSample); //classController.test
router.get("/template/assignment-grade-template.csv",authenticateByJwt,fileController.getAssignmentGradeTemplate);
router.get("/template/:name", authenticateByJwt,fileController.getTemplate);
router.post("/upload-student-list", authenticateByJwt,fileController.handleUploadedStudentList);
router.post("/upload-assignment-grade", authenticateByJwt,fileController.handleUploadedAssignmentGrade);
router.get("/gradeboard", authenticateByJwt, fileController.exportGradeboard);

module.exports = router;