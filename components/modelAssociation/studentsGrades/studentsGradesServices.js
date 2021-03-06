const { Op } = require("sequelize");
const StudentsGrades = require("./studentsGradesModel");
const StudentsClasses = require("../studentsClasses/studentsClassesModel");
const ClassesGradeStructure = require("../classesGradeStructure/classesGradeStructureModel");
const NotificationServices = require("../notifications/notificationsServices");
const classServices = require("../../classes/classService");

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
    if (foundGrade != null) {
      //console.log("CREATE");
      return await this.updateGrade(data, { grade: data.grade });
    }
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
    console.log({ foundGrade });
    if (foundGrade == null || foundGrade.isFinalDecision == true)
      return { success: false, message: "..." };
    foundGrade.finalizedGrade = foundGrade.grade;
    const result = await foundGrade.save();
    //----Notify for student
    //Find student
    const found = await this.findStudentByStudentGrades(
      data.studentsClasses_id,
      data.gradeStructure_id
    );
    //return { found };
    console.log({ found });
    //Notify
    const foundClass = await classServices.getOneClassByClassID(
      found[0].ClassId
    );
    const content = {
      class_id: found[0].ClassId,
      content:
        // "Your " +
        // found[0].gradeTitle +
        " grade has been finalized in " + foundClass.className,
    };
    // console.log({ content });
    await NotificationServices.CreateNotificationByStudentId(
      found[0].student_id,
      content
    );
    return { success: true, message: result };
  } catch (error) {
    console.log(error);
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
    foundGrade.grade = data.grade;
    foundGrade.isFinalDecision = true;
    const result = await foundGrade.save();
    //Find student
    const found = await this.findStudentByStudentGrades(data.studentGrade_Id);
    console.log({ found });

    //Notify
    const foundClass = await classServices.getOneClassByClassID(
      found[0].ClassId
    );
    const content = {
      class_id: found[0].ClassId,
      content:
        // "Your " +
        // found[0].gradeTitle +
        " grade received a final decision in " + foundClass.className,
    };
    console.log({ content });
    await NotificationServices.CreateNotificationByStudentId(
      found[0].student_id,
      content
    );
    return { success: true, message: result };
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.findStudentByStudentGrades = async (a1, a2) => {
  try {
    let result;
    if (a2 == null || a2 == undefined)
      result = await StudentsClasses.findAll({
        include: {
          model: ClassesGradeStructure,
          where: {
            "$classesgradestructures.studentsgrades.id$": a1,
          },
        },
        raw: true,
        nest: true,
      });
    else
      result = await StudentsClasses.findAll({
        include: {
          model: ClassesGradeStructure,
          where: {
            "$classesgradestructures.studentsgrades.studentsClasses_id$": a1,
            "$classesgradestructures.studentsgrades.gradeStructure_id$": a2,
          },
        },
        raw: true,
        nest: true,
      });

    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports.configDB = async () => {
  try {
    //get all student classes
    let structures = await ClassesGradeStructure.findAll({
      include: {
        model: StudentsClasses,
        required: true,
      },
      nest: true,
      raw: true,
    });
    //then update them
    for (
      let structureIndex = 0;
      structureIndex < structures.length;
      structureIndex++
    ) {
      if (structures[structureIndex].studentsClasses.id != null) {
        //console.log(structures[structureIndex].studentsClasses.id);
        const exist = await StudentsClasses.findOne({
          where: {
            student_id: structures[structureIndex].studentsClasses.student_id,
            ClassId: structures[structureIndex].ClassId,
          },
          nest: true,
          raw: true,
        });
        if (
          exist.ClassId != structures[structureIndex].studentsClasses.ClassId
        ) {
          await StudentsClasses.destroy({
            where: {
              id: structures[structureIndex].studentsClasses.id,
            },
          });
        } else {
          //console.log({ exist });
          await StudentsClasses.update(
            { ClassId: structures[structureIndex].ClassId },
            {
              where: {
                id: structures[structureIndex].studentsClasses.id,
              },
            }
          );
        }
      }
    }
    //Get them after updating
    structures = await ClassesGradeStructure.findAll({
      include: {
        model: StudentsClasses,
        required: true,
      },
      nest: true,
      raw: true,
    });
    return structures;
  } catch (error) {
    console.log(error);
    return error;
  }
};
