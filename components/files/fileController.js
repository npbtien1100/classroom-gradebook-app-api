const Busboy = require("busboy");
const sequelize = require("../../config/db.config");
const StudentsClasses = require("../modelAssociation/studentsClasses/studentsClassesModel");
const User = require("../users/use.model");
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

exports.handleUploadedStudentList = async (req, res) => {
  const busboy = new Busboy({ headers: req.headers });
  const data = [];
  const csvParser = fileService.getCsvParser(data, {
    delimiter: ",",
    relax_column_count: true,
    columns: ["student_id", "fullName"],
  });
  if (!req.query.classId)
    return res.status(400).json({ error: "Empty query string!" });
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
    const result = await fileService.importStudentList(req.query.classId, data);
    if (result.error) {
      res.status(500).send({ message: result.error });
      return;
    }
    res.json(result);
  });
  req.pipe(busboy);
};

exports.handleUploadedAssignmentGrade = async (req, res) => {
  const result = await StudentsClasses.findAll({
    where: { ClassId: 9 },
    attributes: ["student_id", "fullName", "ClassId"],
    include: {
      model: User,
      on: sequelize.where(
        sequelize.col("studentsClasses.student_id"),
        "=",
        sequelize.col("user.student_id")
      ),
      attributes: ["name","image","email","phone"],
    },
  });
  StudentsClasses.findAll();
  res.json(result);
};

exports.exportGradeboard = async (req, res) => {};

// file
//   .pipe(
//     parse({
//       delimiter: ",",
//       columns: ["student_id", "fullName"],
//       relax_column_count: true,
//     })
//   )
//   .on("data", function (csvrow) {
//     console.log(csvrow);
//     console.log("a");
//     csvData.push(csvrow);
//   })
//   .on("end", function () {
//     console.log("End of csv parser");
//     //do something with csvData
//     // console.log({ csvData });
//     // console.log({ errArray });
//   })
//   .on("error", function (err) {
//     errArray.push(err);
//   });
