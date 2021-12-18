const { parse } = require("csv-parse");
const studentsClassesModel = require("../modelAssociation/studentsClasses/studentsClassesModel");
const StudentsGrades = require("../modelAssociation/studentsGrades/studentsGradesModel");
const fs = require("fs");

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
exports.createCsvFile = (studentList) => {
  return new Promise((resolve, reject) => {
    try {
      const filePath = `${__dirname}/templates/temp-student-list-template.csv`;
      const writeStream = fs.createWriteStream(filePath);

      writeStream.on("open", (fd) => {
        const header = `StudentId,Grade,#Max grade is 100\n`;
        writeStream.write(header);

        studentList.forEach((student, index) => {
          const newLine = `${student.student_id},\n`;
          writeStream.write(newLine);
        });
        writeStream.end();
        writeStream.on("close", () => {
          resolve(filePath);
        });
      });
    } catch (err) {
      console.error(err);
    }
  });
};
exports.deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error(err);
    return;
  });
};
exports.getStudentList = async (classId) => {
  try {
    const result = await studentsClassesModel.findAll({
      where: { ClassId: classId },
      order: [["student_id"]],
    });
    return result;
  } catch (err) {
    console.error(err);
    return {
      error: "Some error happen, try again!",
    };
  }
};
exports.createOrUpdateStudentClasses = async (obj) => {
  try {
    const studentInClass = await studentsClassesModel.findOne({
      where: {
        student_id: obj.student_id,
        ClassId: obj.ClassId,
      },
    });
    if (studentInClass) {
      studentInClass.fullName = obj.fullName;
      return studentInClass.save();
    } else {
      return studentsClassesModel.create(obj);
    }
  } catch (error) {
    console.error(error);
  }
};
exports.importStudentList = async (classId, data) => {
  try {
    //CreateOrUpdate
    const createOrUpdate = data.map((e) => {
      e.ClassId = classId;
      return this.createOrUpdateStudentClasses(e);
    });
    await Promise.all(createOrUpdate);
    return { message: "Import students list successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error:
        error.message || "Some error occurred while importing students list!",
    };
  }
};
exports.createOrUpdateAssignmentGrade = async (obj) => {
  try {
    const studentGrade = await StudentsGrades.findOne({
      where: {
        studentsClasses_id: obj.studentsClasses_id,
        gradeStructure_id: obj.gradeStructure_id,
      },
    });
    if (studentGrade) {
      if (studentGrade.grade != obj.grade)
        return studentGrade.update({ grade: obj.grade });
    } else {
      return StudentsGrades.create(obj);
    }
  } catch (error) {
    console.error(error);
  }
};
exports.importAssignmentGrade = async (classId, gradeStructureId, data) => {
  try {
    const result = data.map(async (ele) => {
      const studentInClass = await studentsClassesModel.findOne({
        where: { student_id: ele.student_id, ClassId: classId },
      });
      if (studentInClass) {
        return this.createOrUpdateAssignmentGrade({
          studentsClasses_id: studentInClass.id,
          gradeStructure_id: gradeStructureId,
          grade: ele.grade,
        });
      }
    });
    await Promise.all(result);
    return { message: "Import assignment grade successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error:
        error.message ||
        "Some error occurred while importing assignment grade!",
    };
  }
};
