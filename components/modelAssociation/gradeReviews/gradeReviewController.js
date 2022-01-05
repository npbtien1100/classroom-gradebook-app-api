const {
  gradeReviewValidate,
  gradeReviewCommentValidate,
} = require("./gradeReviewValidate");
const gradeReviewsServices = require("./gradeReviewsServices");

exports.CreateNewRequestedReview = async (req, res) => {
  const data = req.body;
  const validated = gradeReviewValidate(data);
  if (validated.error != null)
    return res.status(400).json({
      success: false,
      message: validated.error.details[0].message,
    });

  //Role vs Authorization

  //Create a grade Review if it is not exist
  const result = await gradeReviewsServices.createGradeReview(data);

  res.json({ success: true, message: result });
};

exports.GetOneGradeReview = async (req, res) => {
  const { studentGrade_Id } = req.query;
  //console.log({ studentGrade_Id, query: req.query });

  //Find One Student grade
  const studentGrade = await gradeReviewsServices.findOneStudentGrade(
    studentGrade_Id
  );
  //Find Comment
  const gradeReview = await gradeReviewsServices.findOneGradeReviewWithComments(
    studentGrade_Id
  );

  res.json({ studentGrade, gradeReview });
};

exports.CreateOneComment = async (req, res) => {
  const data = req.body;
  data.userId = req.user.id;
  console.log(data);
  const validated = gradeReviewCommentValidate(data);
  if (validated.error != null)
    return res.status(400).json({
      success: false,
      message: validated.error.details[0].message,
    });
  const result = await gradeReviewsServices.createNewComment(data);
  res.json(result);
};

exports.GetListGradeReviewOfClass = async (req, res) => {
  const { classId } = req.params;
  // console.log(classId);
  //Get All Student grades
  const AllStudentGrade =
    await gradeReviewsServices.getAllStudentGradeOfOneClass(classId);
  //Get Grade Review if It exist

  let result = [];
  await Promise.all(
    AllStudentGrade.map(async (element) => {
      //console.log(element["classesGradeStructures.studentsGrades.id"]);
      if (element["studentsClasses.studentsGrades.id"] == null) return;
      const gradeReview = await gradeReviewsServices.findOneByStudentGradeId(
        element["studentsClasses.studentsGrades.id"]
      );
      //console.log(gradeReview);
      if (gradeReview != null) {
        element.gradeReview = gradeReview;
        result.push(element);
      }
    })
  );
  res.json(result);
};
