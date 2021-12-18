const StudentsClasses = require("./studentsClassesModel");
const StudentsGrades = require("../studentsGrades/studentsGradesModel");
const ClassGradeStructure = require("../classesGradeStructure/classesGradeStructureModel");
const Sequelize = require("sequelize");
const ClassesGradeStructureServices = require("../classesGradeStructure/classesGradeStructureService");

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
        required: true,
        right: true,
      },
      where: {
        ClassId: classId,
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
    console.log({ rawGrades });
    rawGrades = convertToResult(rawGrades, attributes);

    const grade_structure_list =
      await ClassesGradeStructureServices.getAllClassGradeStructure(classId);

    //Create All grades composition
    const AllGradeCompositions =
      CreateAllGradeCompositions(grade_structure_list);
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
function MapGrade(rawGrades, AllGradeCompositions, student_id) {
  const len = AllGradeCompositions.length;
  for (let i = 0; i < len; i++) {
    AllGradeCompositions[i].student_id = student_id;
    const len1 = rawGrades.length;
    for (let j = 0; j < len1; j++) {
      if (
        AllGradeCompositions[i].gradeStructure_id ==
        rawGrades[j].gradeStructure_id
      ) {
        AllGradeCompositions[i].grade = rawGrades[j].grade;
        AllGradeCompositions[i].finalizedGrade = rawGrades[j].finalizedGrade;
        break;
      }
    }
  }
  return AllGradeCompositions;
}

function CreateAllGradeCompositions(grade_structure_list) {
  const len = grade_structure_list.length;
  let result = [];
  for (let i = 0; i < len; i++) {
    let grade = {
      studentsClasses_id: 0,
      gradeStructure_id: 0,
      grade: null,
      finalizedGrade: null,
      student_id: 0,
      gradeTitle: "",
      gradeDetail: 0,
    };
    grade.studentsClasses_id = grade_structure_list[i].ClassId;
    grade.gradeStructure_id = grade_structure_list[i].id;
    grade.gradeTitle = grade_structure_list[i].gradeTitle;
    grade.gradeDetail = grade_structure_list[i].gradeDetail;
    //console.log({ grade });
    result.push(grade);
  }
  return result;
}

function convertToResult(result, attributes) {
  result = result.map((el) => {
    let temp = {};
    for (let i = 0; i < attributes.length; i++) {
      const attribute = attributes[i];
      //console.log({ temp });
      temp[attribute] = el[attribute];
    }
    return temp;
  });
  return result;
}
