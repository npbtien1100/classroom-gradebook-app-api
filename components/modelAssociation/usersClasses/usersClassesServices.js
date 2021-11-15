const Class = require("../../classes/classModel");

exports.checkIsTeacherOfAClass = async (classId, user) => {
  const clss = Class.build({ id: parseInt(classId) });
  const res = await user.hasClass(clss, {
    through: {
      where: { role: "teacher" },
    },
  });
  return res;
};
