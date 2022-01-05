const Class = require("../../classes/classModel");
const UsersClassesModel = require("./usersClassesModel");

exports.checkIsTeacherOfAClass = async (classId, user) => {
  const clss = Class.build({ id: parseInt(classId) });
  const res = await user.hasClass(clss, {
    through: {
      where: { role: "teacher" },
    },
  });
  return res;
};
exports.checkIsStudentOfAClass = async (classId, user) => {
  const clss = Class.build({ id: parseInt(classId) });
  const res = await user.hasClass(clss, {
    through: {
      where: { role: "student" },
    },
  });
  return res;
};
exports.checkIsMemberOfAClass = async (classId, user) => {
  try {
    const clss = Class.build({ id: parseInt(classId) });
    const res = await user.hasClass(clss);
    return res;
  } catch (err) {
    console.error(err);
  }
};
exports.addUserToClass = async (userId, classId, role) => {
  try {
    const res = await UsersClassesModel.create({
      ClassId: classId,
      UserId: userId,
      role: role,
    });
    return res;
  } catch (err) {
    console.error(err);
  }
};
exports.updateRole = async (userId, classId, role) => {
  try {
    const res = await UsersClassesModel.update(
      { role: role },
      { where: { ClassId: classId, UserId: userId } }
    );
    return res;
  } catch (err) {
    console.error(err);
  }
};
exports.getRoleInClass = async (classId, userId) => {
  try {
    const res = await UsersClassesModel.findOne({
      where: { ClassId: classId, UserId: userId },
    });
    return res.role;
  } catch (err) {
    console.error(err);
  }
};
