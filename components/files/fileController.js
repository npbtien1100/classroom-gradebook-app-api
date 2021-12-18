const Busboy = require("busboy");
const { checkIsTeacherOfAClass } = require("../modelAssociation/usersClasses/usersClassesServices");
const fileService = require("./fileService");
const fileValidator = require("./fileValidate");

exports.getTemplate = async (req, res) => {
  const fileName = req.params.name;
  const directoryPath = `${__dirname}/templates/`;

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. ",
      });
    }
  });
};
exports.getAssignmentGradeTemplate = async (req, res) => {
  if (!req.query.classId) {
    return res.status(400).json({ error: "Empty query string!" });
  }
  const studentList = await fileService.getStudentList(req.query.classId);
  if (studentList.error) {
    res.status(500).send({ message: studentList.error });
    return;
  }
  const filePath = await fileService.createCsvFile(studentList);

  res.download(filePath, "assignment-grade-template.csv", function (err) {
    fileService.deleteFile(filePath);
  });
};
exports.handleUploadedStudentList = async (req, res) => {
  try {
    if (!req.query.classId)
      return res.status(400).json({ error: "Empty query string!" });
    //check user is teacher of the class
    const check = await checkIsTeacherOfAClass(req.query.classId, req.user);
    if (!check)
      return res.status(403).json({ message: "You are not allowed!" });

    const busboy = new Busboy({ headers: req.headers });
    const data = [];
    const csvParser = fileService.getCsvParser(data, {
      delimiter: ",",
      comment: "#",
      relax_column_count: true,
      columns: ["student_id", "fullName"],
    });

    busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
      console.log(
        `File [${fieldname}]: filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`
      );
      // file.on("data",()=>{});
      // file.on("close",()=>{});
      if (filename.split(".")[1] !== "csv") {
        res.status(400).json({ error: "Wrong file format!" });
        return;
      }
      file.pipe(csvParser);
    });

    busboy.on("finish", async () => {
      //check header
      const [{ student_id, fullName }] = data.splice(0, 1);
      if (
        student_id.toLowerCase().localeCompare("studentid") ||
        fullName.toLowerCase().localeCompare("fullname")
      ) {
        //
        res.status(400).json({ error: "Wrong header field" });
        return;
      }
      //validate data
      const checkingData = fileValidator.validateStudentList(data);
      if (checkingData.error) {
        res.status(400).json({
          error: "bad input entry",
          message: checkingData.error.details,
        });
        return;
      }
      //insert to database
      const result = await fileService.importStudentList(
        req.query.classId,
        data
      );
      if (result.error) {
        res.status(500).send({ message: result.error });
        return;
      }
      res.json(result);
    });
    req.pipe(busboy);
  } catch (err) {
    console.error(err);
  }
};

//classId gradeStructure_id
exports.handleUploadedAssignmentGrade = async (req, res) => {
  try {
    if (!req.query.classId || !req.query.gradeStructure_id)
      return res.status(400).json({ error: "Empty query string!" });
    //check user is teacher of the class
    const check = await checkIsTeacherOfAClass(req.query.classId, req.user);
    if (!check)
      return res.status(403).json({ message: "You are not allowed!" });

    const busboy = new Busboy({ headers: req.headers });
    const data = [];
    const csvParser = fileService.getCsvParser(data, {
      delimiter: ",",
      comment: "#",
      relax_column_count: true,
      columns: ["student_id", "grade"],
    });

    busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
      console.log(
        `File [${fieldname}]: filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`
      );
      // file.on("data",()=>{});
      // file.on("close",()=>{});
      if (filename.split(".")[1] !== "csv") {
        res.status(400).json({ error: "Wrong file format!" });
        return;
      }
      file.pipe(csvParser);
    });

    busboy.on("finish", async () => {
      //check header
      const [{ student_id, grade }] = data.splice(0, 1);
      if (
        student_id.toLowerCase().localeCompare("studentid") ||
        grade.toLowerCase().localeCompare("grade")
      ) {
        //
        res.status(400).json({ error: "Wrong header field" });
        return;
      }
      //validate data
      const checkingData = fileValidator.validateAssignmentGrade(data);
      if (checkingData.error) {
        res.status(400).json({
          error: "bad input entry",
          message: checkingData.error.details,
        });
        return;
      }
      //insert to database
      const result = await fileService.importAssignmentGrade(
        req.query.classId,
        req.query.gradeStructure_id,
        data
      );
      if (result.error) {
        res.status(500).send({ message: result.error });
        return;
      }
      res.json(result);
    });
    req.pipe(busboy);
  } catch (err) {
    console.error(err);
  }
};

exports.exportGradeboard = async (req, res) => {};

// const result = await StudentsClasses.findAll({
//   where: { ClassId: 9 },
//   attributes: ["student_id", "fullName", "ClassId"],
//   include: {
//     model: User,
//     on: sequelize.where(
//       sequelize.col("studentsClasses.student_id"),
//       "=",
//       sequelize.col("user.student_id")
//     ),
//     attributes: ["name","image","email","phone"],
//   },
// });
// StudentsClasses.findAll();
// res.json(result);
