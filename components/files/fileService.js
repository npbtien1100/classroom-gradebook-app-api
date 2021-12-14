const { parse } = require("csv-parse");
const studentsClassesModel = require("../modelAssociation/studentsClasses/studentsClassesModel");

exports.getCsvParser = (dataArray, optionObject) => {
  const csvParser = parse(optionObject)
    .on("data", function (csvrow) {
      dataArray.push(csvrow);
    })
    .on("end", function () {})
    .on("error", function (err) {
      console.log(err);
    });
  return csvParser;
};

exports.importStudentList = async (classId, data) => {
  try {
    await Promise.all(
      data.map((element) =>
        studentsClassesModel.create({ ...element, ClassId: classId })
      )
    );
    return { message: "Import students list successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error:
        error.message || "Some error occurred while importing students list!",
    };
  }
};
