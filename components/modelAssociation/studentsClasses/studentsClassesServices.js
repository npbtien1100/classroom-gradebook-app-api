const StudentsClasses = require("./studentsClassesModel");
const StudentsGrades = require("../studentsGrades/studentsGradesModel");
const ClassGradeStructure = require("../classesGradeStructure/classesGradeStructureModel");
const Sequelize = require("sequelize");
const ClassesGradeStructureServices = require("../classesGradeStructure/classesGradeStructureService");
const {
  convertToResult,
  AddAveragePoint,
  CreateAllGradeCompositions,
  MapGrade,
} = require("./util");
const { date } = require("@hapi/joi");

module.exports.getAveragePointsOfOneClass = async (classId) => {
  try {
    const attributes = [
      "ClassId",
      "id",
      "averagePoint",
      "gradeTitle",
      "gradeDetail",
    ];
    let result = await ClassGradeStructure.findAll({
      include: {
        model: StudentsClasses,
      },
      where: { ClassId: classId },
      group: ["id"],
      attributes: [
        "id",
        "ClassId",
        "gradeTitle",
        "gradeDetail",
        [
          Sequelize.fn(
            "avg",
            Sequelize.col("studentsClasses.studentsGrades.finalizedGrade")
          ),
          "averagePoint",
        ],
      ],
      raw: true,
    });
    result = convertToResult(result, attributes);
    result = AddAveragePoint(result);
    return result;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error,
    };
  }
};
module.exports.getAllVirtualStudent = async (classId) => {
  try {
    const attributes = ["ClassId", "student_id", "fullName"];
    let result = await StudentsClasses.findAll({
      where: { ClassId: classId },
      group: ["student_id"],
      include: {
        model: ClassGradeStructure,
      },
      order: [
        // Will escape title and validate DESC against a list of valid direction parameters
        ["student_id"],
      ],
      attributes: attributes,
      raw: true,
    });
    //console.log({ result });
    result = convertToResult(result, attributes);
    return result;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error,
    };
  }
};

// module.exports.getAllCompositionStudent = async (classId, student_id) => {
//   try {
//     const attributes = [
//       "studentsClasses.studentsGrades.studentsClasses_id",
//       "studentsClasses.studentsGrades.gradeStructure_id",
//       "studentsClasses.id",
//       "studentsClasses.student_id",
//       "studentsClasses.fullName",
//       "studentsClasses.studentsGrades.grade",
//       "studentsClasses.studentsGrades.finalizedGrade",
//       "gradeTitle",
//       "gradeDetail",
//     ];
//     let result = await ClassGradeStructure.findAll({
//       include: {
//         model: StudentsClasses,
//         where: {
//           student_id: student_id,
//         },
//       },
//       where: {
//         ClassId: classId,
//       },
//       attributes: [
//         "studentsClasses.studentsGrades.studentsClasses_id",
//         "studentsClasses.studentsGrades.gradeStructure_id",
//         "studentsClasses.id",
//         "studentsClasses.student_id",
//         "studentsClasses.fullName",
//         "studentsClasses.studentsGrades.grade",
//         "studentsClasses.studentsGrades.finalizedGrade",
//         "gradeTitle",
//         "gradeDetail",
//       ],
//       raw: true,
//     });

//     //result = result.filter((el) => el.student_id == student_id);
//     //console.log({ result });
//     result = convertToResult(result, attributes);
//     return result;
//   } catch (error) {
//     console.log(error);
//     return {
//       success: false,
//       error: error,
//     };
//   }
// };

module.exports.getAllCompositionStudent = async (classId, student_id) => {
  try {
    const attributes = [
      "studentsClasses_id",
      "gradeStructure_id",
      "grade",
      "finalizedGrade",
      "student_id",
      "gradeTitle",
      "gradeDetail",
    ];
    let rawGrades = await StudentsClasses.findAll({
      include: {
        model: ClassGradeStructure,
      },
      where: {
        student_id: student_id,
      },
      attributes: [
        "classesGradeStructures.studentsGrades.studentsClasses_id",
        "classesGradeStructures.studentsGrades.gradeStructure_id",
        "classesGradeStructures.studentsGrades.grade",
        "classesGradeStructures.studentsGrades.finalizedGrade",
        "student_id",
        "classesGradeStructures.gradeTitle",
        "classesGradeStructures.gradeDetail",
      ],
      raw: true,
    });
    // return rawGrades;
    rawGrades = convertToResult(rawGrades, attributes);

    const grade_structure_list =
      await ClassesGradeStructureServices.getAllClassGradeStructure(classId);

    // const classId = rawGrades[0].studentsClasses_id;
    const studentsClasses_id = await StudentsClasses.findOne({
      where: {
        student_id: student_id,
      },
      raw: true,
    });

    //Create All grades composition
    const AllGradeCompositions = CreateAllGradeCompositions(
      grade_structure_list,
      studentsClasses_id.id
    );
    //Map them
    const finalResult = MapGrade(rawGrades, AllGradeCompositions, student_id);
    return finalResult;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error,
    };
  }
};

module.exports.CreateOneStudentsClasses = async ({
  fullName,
  ClassId,
  student_id,
}) => {
  try {
    const result = await StudentsClasses.create({
      fullName,
      ClassId,
      student_id,
    });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.CreateIfNotExistStudentsClasses = async ({
  fullName,
  ClassId,
  student_id,
}) => {
  try {
    let result = await StudentsClasses.findOne({
      where: {
        ClassId,
        student_id,
      },
    });
    console.log({ result });
    if (result == null)
      result = await this.CreateOneStudentsClasses({
        fullName,
        ClassId,
        student_id,
      });
    return result;
  } catch (error) {
    console.log(error);
    return error;
  }
};
