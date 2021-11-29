const ClassesGradeStructure = require("./classesGradeStructureModel");
const { Op } = require("sequelize");
exports.updateAClassGradeStructure = async (
  classGradeStructureId,
  attributeObject
) => {
  try {
    const res = await ClassesGradeStructure.update(attributeObject, {
      where: { id: classGradeStructureId },
    });
    return res;
  } catch (err) {
    throw err;
  }
};
exports.reOrderGradeStructure = async (classId, srcIndex, desIndex) => {
  try {
    const selectedGradeStructure = await ClassesGradeStructure.findOne({
      where: { ClassId: classId, index: srcIndex },
    });
    let increOrDecreElements;
    if (srcIndex < desIndex) {
      increOrDecreElements = ClassesGradeStructure.decrement("index", {
        where: {
          [Op.and]: [
            { ClassId: classId },
            { index: { [Op.gt]: srcIndex } },
            { index: { [Op.lte]: desIndex } },
          ],
        },
      });
    } else if (srcIndex > desIndex) {
      increOrDecreElements = ClassesGradeStructure.increment("index", {
        where: {
          [Op.and]: [
            { ClassId: classId },
            { index: { [Op.gte]: desIndex } },
            { index: { [Op.lt]: srcIndex } },
          ],
        },
      });
    }

    const updateELement = selectedGradeStructure.update({ index: desIndex });
    await increOrDecreElements;
    await updateELement;
    return;
  } catch (error) {
    throw error;
  }
};

exports.removeAGradeStructure = async (classId, gradeStructureId) => {
  try {
    const gradeStructure = await ClassesGradeStructure.findOne({
      where: { id: gradeStructureId },
    });
    const srcIndex = gradeStructure.index;
    const destroyElement = gradeStructure.destroy();
    const decrementElement = ClassesGradeStructure.decrement("index", {
      where: { ClassId: classId, index: { [Op.gt]: srcIndex } },
    });
    await destroyElement;
    await decrementElement;
    return;
  } catch (error) {
    throw error;
  }
};

exports.bulkCreateGradeStructure = async (arrObj) => {
  try {
    await ClassesGradeStructure.bulkCreate(arrObj);
    return;
  } catch (error) {
    throw error;
  }
};
