const Notification = require("./notificationsModel");
const pageSize = 10;
const UserServices = require("../../users/user.service");
const ClassServices = require("../../classes/classService");
module.exports.getNotificationsOfStudentByPage = async (userId, page) => {
  try {
    if (page == null || page == undefined) page = 0;
    console.log({ page });
    const notifications = await Notification.findAndCountAll({
      where: {
        user_id: userId,
      },
      limit: pageSize,
      offset: pageSize * page,
    });
    return { success: true, notifications };
  } catch (error) {
    return { success: false, error };
  }
};

module.exports.CreateNotificationByStudentId = async (studentId, content) => {
  try {
    const user = await UserServices.findUserByStudentId(studentId);
    content = { ...content, user_id: user.id };
    //console.log({ content });
    const result = await Notification.create(content);
    return result;
  } catch (error) {
    return { success: false, error };
  }
};

module.exports.CreateNotificationForTeacher = async (classId, content) => {
  try {
    console.log({ classId });
    const teachers = await ClassServices.getAllTeacherInClass(classId);
    //Duyet qua all
    return teachers;
  } catch (error) {
    return { success: false, error };
  }
};
