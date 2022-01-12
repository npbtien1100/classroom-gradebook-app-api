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
      order: [["createdAt", "ASC"]],
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

module.exports.CreateNotificationForTeacher = async (foundGrade, content) => {
  try {
    console.log({ foundGrade });
    const classTeacher = await ClassServices.getAllTeacherInClass(
      foundGrade.classesGradeStructures.ClassId
    );
    console.log({ classTeacher });
    //Duyet qua all
    await Promise.all(
      classTeacher.map(async (teacher) => {
        const content = {
          user_id: teacher.users.id,
          class_id: foundGrade.classesGradeStructures.ClassId,
          content:
            "Student " +
            foundGrade.student_id +
            " - " +
            foundGrade.fullName +
            " request grade review in grade structure " +
            foundGrade.classesGradeStructures.gradeTitle +
            " in class  " +
            teacher.className,
        };
        await Notification.create(content);
      })
    );
    return classTeacher;
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

module.exports.SetSeenNotification = async (id) => {
  try {
    const notification = await Notification.findOne({ id: id });
    if (notification == null) return null;
    notification.IsSeen = true;
    (await notification).save();
    return notification;
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};
