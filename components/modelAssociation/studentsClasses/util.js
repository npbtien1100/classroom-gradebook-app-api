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
exports.MapGrade = MapGrade;
function CreateAllGradeCompositions(grade_structure_list, studentsClasses_id) {
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
    grade.studentsClasses_id = studentsClasses_id;
    grade.gradeStructure_id = grade_structure_list[i].id;
    grade.gradeTitle = grade_structure_list[i].gradeTitle;
    grade.gradeDetail = grade_structure_list[i].gradeDetail;
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
