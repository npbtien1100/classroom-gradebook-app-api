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
const GradeReviews = require("../gradeReviews/gradeReviewsModel");

module.exports.getAveragePointsOfOneStudentGrades = async (
  gradeStructureId
) => {
  try {
    let result = await StudentsGrades.findOne({
      where: { gradeStructure_id: gradeStructureId },
      attributes: [
        [Sequelize.fn("avg", Sequelize.col("finalizedGrade")), "averagePoint"],
        "gradeStructure_id",
      ],
      raw: true,
    });
    return result;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error,
    };
  }
};
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
            Sequelize.col("studentsClasses.studentsgrades.finalizedGrade")
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
      "isFinalDecision",
      "ClassId",
      "id",
    ];
    //GET Student Infor
    let rawGrades = await StudentsClasses.findAll({
      include: {
        model: ClassGradeStructure,
      },
      where: {
        student_id: student_id,
        classId: classId,
      },
      attributes: [
        "ClassId",
        "classesgradestructures.studentsgrades.id",
        "classesgradestructures.studentsgrades.studentsClasses_id",
        "classesgradestructures.studentsgrades.gradeStructure_id",
        "classesgradestructures.studentsgrades.grade",
        "classesgradestructures.studentsgrades.finalizedGrade",
        "classesgradestructures.studentsgrades.isFinalDecision",
        "student_id",
        "classesgradestructures.gradeTitle",
        "classesgradestructures.gradeDetail",
      ],
      raw: true,
    });

    rawGrades = convertToResult(rawGrades, attributes);
    //return rawGrades;
    //Get student Infor
    const studentsClassesInfo = await StudentsClasses.findOne({
      where: {
        student_id: student_id,
        ClassId: classId,
      },
      raw: true,
    });

    if (studentsClassesInfo == null) return [];
    //Grate structure
    const grade_structure_list =
      await ClassesGradeStructureServices.getAllClassGradeStructure(classId);

    //Create All grades composition
    const AllGradeCompositions = CreateAllGradeCompositions(
      grade_structure_list,
      studentsClassesInfo
    );
    //Map them
    const finalResult = MapGrade(rawGrades, AllGradeCompositions);

    // return finalResult;
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
