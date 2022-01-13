const GradeValidation = require("./studentsGradeValidate");
const GradeService = require("./studentsGradesServices");
const StudentClassServices = require("../studentsClasses/studentsClassesServices");

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
  res.json(result);
};

module.exports.MakeOneGradeFinalize = async (req, res) => {
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
  //Make Finalize Grade
  await GradeService.makeOneGradeFinalize(data);
  //GET Class ID = ?
  const Subject = await StudentClassServices.getAveragePointsOfOneStudentGrades(
    data.gradeStructure_id
  );

  res.json({ success: true, Subject });
};

module.exports.MakeAllGradeFinalize = async (req, res) => {
  console.log(req.body);
  //check Role
  //Check Valid data
  const data = req.body;
  const validated = GradeValidation.makeAllFinalizeValidate(data);
  if (validated.error != null)
    return res.status(400).json({
      success: false,
      message: validated.error.details[0].message,
    });
  //Make Finalize Grade
  await GradeService.makeAllGradeFinalize(data);
  const Subject = await StudentClassServices.getAveragePointsOfOneStudentGrades(
    data.gradeStructure_id
  );
  res.json({ success: true, Subject });
};

module.exports.MakeAsFinalDecision = async (req, res) => {
  const data = req.body;

  const result = await GradeService.MakeAsFinalDecision(data);

  res.send(result);
};

module.exports.ConfigDB = async (req, res) => {
  const result = await GradeService.configDB();
  res.json({ result });
};
