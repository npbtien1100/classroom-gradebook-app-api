function CaculateAverageOfEachStudent(studentsGrades) {
  let averagePoint = 0;
  let expectedAveragePoint = 0;
  let len = studentsGrades.length;
  for (let i = 0; i < len; i++) {
    // console.log(studentsGrades[i].finalizedGrade);
    if (studentsGrades[i].finalizedGrade != null)
      averagePoint +=
        (studentsGrades[i].finalizedGrade * studentsGrades[i].gradeDetail) /
        100;
    if (studentsGrades[i].grade != null)
      expectedAveragePoint +=
        (studentsGrades[i].grade * studentsGrades[i].gradeDetail) / 100;
  }
  return [...studentsGrades, { averagePoint, expectedAveragePoint }];
}

exports.CaculateAverageOfEachStudent = CaculateAverageOfEachStudent;
function MapVirtualAndReadlStudent(studentVirtualGrades, realStudents) {
  let len = realStudents.length;
  for (let i = 0; i < len; i++) {
    let pos = FindInArray(studentVirtualGrades, realStudents[i]);
    if (pos == -1) {
      if (realStudents[i]["student_id"] != null)
        studentVirtualGrades.push({
          ClassId: realStudents[i]["users.usersclasses.ClassId"],
          student_id: realStudents[i]["student_id"],
          fullName: realStudents[i]["name"],
          image: realStudents[i]["image"],
        });
    } else
      studentVirtualGrades[pos] = {
        ...studentVirtualGrades[pos],
        image: realStudents[i].image,
      };
  }
  return studentVirtualGrades;
}
exports.MapVirtualAndReadlStudent = MapVirtualAndReadlStudent;
function FindInArray(studentVirtualGrades, realStudent) {
  let len = studentVirtualGrades.length;
  for (let i = 0; i < len; i++) {
    if (studentVirtualGrades[i].student_id == realStudent.student_id) return i;
  }
  return -1;
}
