const GradeValidation = require("./studentsGradeValidate");
const GradeService = require("./studentsGradesServices");

module.exports.CreateOrUpdateStudentGrades = async (req, res) => {
  console.log(req.body);
  //check Role
  //Check Valid data
  const data = req.body;
  const validated = GradeValidation.gradeInputValidate(data);
  if (validated.error != null)
    return res.status(400).json({
      success: false,
      message: validated.error.details[0].message,
    });
  //Create or update
  const result = await GradeService.createOrUpdateGrade(data);

  console.log({ result });
  res.json(result);
};
