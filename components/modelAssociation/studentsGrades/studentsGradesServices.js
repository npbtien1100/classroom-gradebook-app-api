const { Op } = require("sequelize");
const StudentsGrades = require("./studentsGradesModel");

module.exports.updateGrade = async (condition, newvalue) => {
  try {
    const grade = await StudentsGrades.update(newvalue, {
      where: {
        [Op.and]: [
          { studentsClasses_id: condition.studentsClasses_id },
          { gradeStructure_id: condition.gradeStructure_id },
        ],
      },
    });
    return {
      success: true,
      message: grade,
    };
  } catch (error) {
    return error;
  }
};

module.exports.createGrade = async (value) => {
  try {
    const grade = await StudentsGrades.create(value);
    return {
      success: true,
      message: grade,
    };
  } catch (error) {
    return error;
  }
};

module.exports.createOrUpdateGrade = async (data) => {
  try {
    // console.log("Grade Services- create or update grade - data ");
    // console.log(data.gradeStructure_id);
    const foundGrade = await StudentsGrades.findOne({
      where: {
        [Op.and]: [
          { studentsClasses_id: data.studentsClasses_id },
          { gradeStructure_id: data.gradeStructure_id },
        ],
      },
    });
    if (foundGrade != null)
      return await this.updateGrade(data, { grade: data.grade });
    return await this.createGrade(data);
  } catch (error) {
    //console.log(error);
    return { success: false, message: error };
  }
};

module.exports.makeOneGradeFinalize = async (data) => {
  try {
    const foundGrade = await StudentsGrades.findOne({
      where: {
        [Op.and]: [
          { studentsClasses_id: data.studentsClasses_id },
          { gradeStructure_id: data.gradeStructure_id },
        ],
      },
    });
    if (foundGrade == null || foundGrade.isFinalDecision == true)
      return { success: false, message: "..." };
    foundGrade.finalizedGrade = foundGrade.grade;
    const result = await foundGrade.save();
    return { success: true, message: result };
  } catch (error) {
    return error;
  }
};

module.exports.makeAllGradeFinalize = async (data) => {
  try {
    const foundGrades = await StudentsGrades.findAll({
      where: {
        gradeStructure_id: data.gradeStructure_id,
      },
      attributes: ["studentsClasses_id", "gradeStructure_id"],
      raw: true,
      nest: true,
    });
    console.log(foundGrades);
    await Promise.all(
      foundGrades.map(async (element) => {
        // console.log(element);
        await this.makeOneGradeFinalize({
          studentsClasses_id: element.studentsClasses_id,
          gradeStructure_id: element.gradeStructure_id,
        });
      })
    );
    return { success: true };
  } catch (error) {
    return error;
  }
};

module.exports.MakeAsFinalDecision = async (data) => {
  try {
    const foundGrade = await StudentsGrades.findOne({
      where: {
        id: data.studentGrade_Id,
      },
    });
    if (foundGrade == null || foundGrade.isFinalDecision == true)
      return { success: false, message: "..." };
    foundGrade.finalizedGrade = data.grade;
    foundGrade.isFinalDecision = true;
    const result = await foundGrade.save();
    return { success: true, message: result };
  } catch (error) {
    return error;
  }
};
