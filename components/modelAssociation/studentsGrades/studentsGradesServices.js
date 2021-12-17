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
    console.log("Grade Services- create or update grade - data ");
    console.log(data.gradeStructure_id);
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
