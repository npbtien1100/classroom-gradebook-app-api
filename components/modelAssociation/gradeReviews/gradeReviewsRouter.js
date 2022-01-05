const express = require("express");
const router = express.Router();
const gradeReviewController = require("./gradeReviewController");

const { authenticateByJwt } = require("../../auth/auth.services");
router.post(
  "/",
  authenticateByJwt,
  gradeReviewController.CreateNewRequestedReview
);
router.get("/", authenticateByJwt, gradeReviewController.GetOneGradeReview);
router.post(
  "/comments",
  authenticateByJwt,
  gradeReviewController.CreateOneComment
);
router.get(
  "/:classId",
  authenticateByJwt,
  gradeReviewController.GetListGradeReviewOfClass
);

module.exports = router;
