function AddAveragePoint(result) {
  let len = result.length;
  let avg = 0;
  for (let i = 0; i < len; i++) {
    if (result[i].averagePoint != null)
      avg += (result[i].averagePoint * result[i].gradeDetail) / 100;
  }
  return [...result, { averagePoint: avg }];
}
exports.AddAveragePoint = AddAveragePoint;
function MapGrade(rawGrades, AllGradeCompositions) {
  console.log({ rawGrades, AllGradeCompositions });
  const len = AllGradeCompositions.length;
  const len1 = rawGrades.length;

  for (let i = 0; i < len1; i++) {
    for (let j = 0; j < len; j++) {
      if (
        AllGradeCompositions[j].gradeStructure_id ==
        rawGrades[i].gradeStructure_id
      ) {
        AllGradeCompositions[j].id = rawGrades[i].id;
        AllGradeCompositions[j].isFinalDecision = rawGrades[i].isFinalDecision;
        AllGradeCompositions[j].grade = rawGrades[i].grade;
        AllGradeCompositions[j].finalizedGrade = rawGrades[i].finalizedGrade;
        break;
      }
    }
  }
  return AllGradeCompositions;
}
exports.MapGrade = MapGrade;
function CreateAllGradeCompositions(grade_structure_list, studentsClassesInfo) {
  const len = grade_structure_list.length;
  let result = [];
  for (let i = 0; i < len; i++) {
    let grade = {
      studentsClasses_id: studentsClassesInfo.id,
      gradeStructure_id: grade_structure_list[i].id,
      grade: null,
      finalizedGrade: null,
      student_id: studentsClassesInfo.student_id,
      gradeTitle: grade_structure_list[i].gradeTitle,
      gradeDetail: grade_structure_list[i].gradeDetail,
      isFinalDecision: false,
      id: "",
    };

    //console.log({ grade });
    result.push(grade);
  }
  return result;
}
exports.CreateAllGradeCompositions = CreateAllGradeCompositions;
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
exports.convertToResult = convertToResult;
