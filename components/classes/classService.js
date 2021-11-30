const Class = require("./classModel");
const MailServices = require("../mailServices/mail.service");
const {
  addUserToClass,
  checkIsMemberOfAClass,
  updateRole,
  getRoleInClass,
} = require("../modelAssociation/usersClasses/usersClassesServices");
const {
  updateAClassGradeStructure,
  reOrderGradeStructure,
  removeAGradeStructure,
  bulkCreateGradeStructure,
} = require("../modelAssociation/classesGradeStructure/classesGradeStructureService");
const ClassesGradeStructure = require("../modelAssociation/classesGradeStructure/classesGradeStructureModel");
const { Op } = require("sequelize");
exports.createClass = async (req) => {
  try {
    const { className, classSection, subject, room } = req.body;
    // const createdClass = await Class.create({
    //   className,
    //   classSection,
    //   subject,
    //   room,
    // });
    // await addUserToClass(req.user.id, createdClass.id, "teacher");
    const user = req.user;
    await user.createClass(
      { className, classSection, subject, room },
      { through: { role: "teacher" } }
    );
    return { message: "Create class successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while creating Class!",
    };
  }
};
exports.getOneClassByID = async (classID, arrayAttributes, userID) => {
  try {
    const foundClass = await Class.findOne({
      where: { id: classID },
      attributes: arrayAttributes,
    });
    const role = await getRoleInClass(classID, userID);
    const res = foundClass.toJSON();
    res.userRole = role;
    return res;
  } catch (error) {
    console.error(error);
  }
};
exports.getAllClasses = async (arrayAttributes, options, user) => {
  try {
    const { orderOption } = options;
    const allClasses = await user.getClasses({
      attributes: arrayAttributes,
      order: orderOption,
      joinTableAttributes: ["role"],
    });
    // const allClasses = await Class.findAll({
    //   attributes: arrayAttributes,
    //   order: orderOption,
    // });
    return allClasses;
  } catch (error) {
    console.error(error);
  }
};
exports.updateAClass = async (classID, attributeObject) => {
  try {
    await Class.update(attributeObject, { where: { id: classID } });
    return { message: "Update class successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while updating Class!",
    };
  }
};
exports.deleteAClass = async (classID) => {
  try {
    await Class.destroy({ where: { id: classID } });
    return { message: "Delete class successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while deleting Class!",
    };
  }
};
exports.createDataSample = async () => {
  try {
    await Class.bulkCreate([
      {
        className: "Phát triển ứng dụng web",
        classSection: "PTUDW",
        subject: null,
        room: "dummy room value",
      },
      {
        className: "Phát triển ứng dụng web nâng cao",
        classSection: "PTUDWNC",
        subject: null,
        room: "dummy room value",
      },
      {
        className: "Kiến trúc phần mềm",
        classSection: "KTPM",
        subject: "",
        room: "dummy room value",
      },
      {
        className: "Mẫu thiết kế hướng đối tượng",
        classSection: "MTKHDT",
        subject: "",
        room: "dummy room value",
      },
      {
        className: "Lập trình Windows",
        classSection: "LTWD",
        subject: "Windows",
        room: "Test dummy room value",
      },
      {
        className: "Lập trình ứng dụng di động",
        classSection: "LTUDDD",
        subject: "Mobile",
        room: "",
      },
      {
        className: "Cơ sở dữ liệu",
        classSection: "CSDL",
        subject: "Database",
        room: "",
      },
      {
        className: "Cấu trúc dữ liệu và giải thuật",
        classSection: "CTDL&GT",
        subject: "",
        room: "",
      },
      {
        className: "Hệ điều hành",
        classSection: "HDH",
        subject: "Operating System",
        room: "",
      },
    ]);
  } catch (error) {
    console.error(error);
  }
};
exports.getAllPeopleInClass = async (classId, arrayAttributes) => {
  try {
    const clss = Class.build({ id: parseInt(classId) });
    const foundPeople = await clss.getUsers({
      attributes: arrayAttributes,
    });
    const res = {
      teachers: { total: 0, teachers_list: [] },
      students: { total: 0, students_list: [] },
    };
    foundPeople.forEach((element) => {
      const role = element.usersclasses.role;
      if (role === "teacher")
        res.teachers.teachers_list.push({
          ...element.toJSON(),
          usersclasses: role,
        });
      else if (role === "student")
        res.students.students_list.push({
          ...element.toJSON(),
          usersclasses: role,
        });
    });
    res.teachers.total = res.teachers.teachers_list.length;
    res.students.total = res.students.students_list.length;

    return res;
  } catch (error) {
    console.error(error);
  }
};
exports.inviteTeachersToAClass = async (classId, emails, user) => {
  try {
    const clss = await Class.findOne({ where: { id: classId } });
    const joinLink = `${process.env.URL_FRONT_END}/accept-invitation?classID=${classId}&tjc=${clss.teacherJoinCode}`;

    const infos = await Promise.all([
      ...emails.map((email, index) => {
        const data = {};
        data.link = joinLink;
        data.email = email;
        data.user = user.toJSON();
        data.class = clss.toJSON();
        return MailServices.sendMailTeacherInvitation(data);
      }),
    ]);
    infos.map((e) => console.log("Email sent: " + e.response));

    return { message: "Create invitations done!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while inviting teacher!",
    };
  }
};
exports.joinTeacherToAClass = async (user, classId, tjc) => {
  try {
    //validate the teacher join code
    const clss = await Class.findOne({
      where: { id: classId, teacherJoinCode: tjc },
    });
    if (!clss) return { error: "Wrong class join code!" };

    //join user to class as teacher and remove the used inviation code
    //check is member of class
    const IsMember = await checkIsMemberOfAClass(classId, user);
    if (IsMember) await updateRole(user.id, classId, "teacher");
    else await addUserToClass(user.id, classId, "teacher");

    //await checkInviteCode.destroy();
    return { message: "Add teacher to class done!" };
  } catch (err) {
    console.error(err);
    return {
      error:
        err.message || "Some error occurred while adding teacher to class!",
    };
  }
};
exports.getJoinLink = async (classId) => {
  try {
    const clss = await Class.findOne({ where: { id: classId } });
    const joinLink = `${process.env.URL_FRONT_END}/accept-invitation?classID=${classId}&sjc=${clss.studentJoinCode}`;
    return { joinLink: joinLink };
  } catch (err) {
    console.error(err);
    return {
      error: err.message || "Some error occurred while joining class!",
    };
  }
};
exports.getTeacherJoinLink = async (classId) => {
  try {
    const clss = await Class.findOne({ where: { id: classId } });
    const joinLink = `${process.env.URL_FRONT_END}/accept-invitation?classID=${classId}&tjc=${clss.teacherJoinCode}`;
    return { joinLink: joinLink };
  } catch (err) {
    console.error(err);
    return {
      error: err.message || "Some error occurred while joining class!",
    };
  }
};
exports.joinStudentToAClass = async (user, classId, sjc) => {
  try {
    //validate the class join code
    const clss = await Class.findOne({
      where: { id: classId, studentJoinCode: sjc },
    });
    if (!clss) return { error: "Wrong class join code!" };
    //Check is member of class
    const IsMember = await checkIsMemberOfAClass(classId, user);
    if (IsMember) await updateRole(user.id, classId, "student");
    else await addUserToClass(user.id, classId, "student");

    return { message: "Joining to class done!" };
  } catch (err) {
    console.error(err);
    return {
      error: err.message || "Some error occurred while joining class!",
    };
  }
};
exports.inviteStudentsToAClass = async (classId, emails, user) => {
  try {
    const clss = await Class.findOne({ where: { id: classId } });
    const joinLink = `${process.env.URL_FRONT_END}/accept-invitation?classID=${classId}&sjc=${clss.studentJoinCode}`;

    const infos = await Promise.all([
      ...emails.map((email, index) => {
        const data = {};
        data.link = joinLink;
        data.email = email;
        data.user = user.toJSON();
        data.class = clss.toJSON();
        return MailServices.sendMailStudentInvitation(data);
      }),
    ]);
    infos.map((e) => console.log("Email sent: " + e.response));

    return { message: "Create invitations done!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while inviting teacher!",
    };
  }
};
exports.test = async (classId, emails, user) => {
  try {
    return { message: "done!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while inviting teacher!",
    };
  }
};
exports.getClassGradeStructure = async (classId, arrayAttributes, options) => {
  try {
    const { orderOption } = options;
    const clss = Class.build({ id: parseInt(classId) });
    const gradeStructure = await clss.getGradeStructure({
      attributes: arrayAttributes,
      order: orderOption,
    });
    return gradeStructure;
  } catch (error) {
    console.error(error);
  }
};
exports.createAClassGradeStructure = async (classId, body) => {
  try {
    const clss = Class.build({ id: parseInt(classId) });
    const index = await clss.countGradeStructure();

    const arrObj = body.map((gradeStructure, i) => {
      const { gradeTitle, gradeDetail } = gradeStructure;
      return { ClassId: classId, gradeTitle, gradeDetail, index: index + i };
    });

    await bulkCreateGradeStructure(arrObj);

    return { message: "Create class grade structure successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while creating Class!",
    };
  }
};
exports.updateAClassGradeStructure = async (classId, body) => {
  try {
    const arrId = [];
    const updateOrCreate = body.map((element, index) => {
      const { gradeTitle, gradeDetail } = element;
      if (element.id) {
        arrId.push(element.id);
        return ClassesGradeStructure.update(
          {
            gradeTitle,
            gradeDetail,
            index,
          },
          {
            where: { id: element.id },
          }
        );
      } else {
        return ClassesGradeStructure.create({
          ClassId: classId,
          gradeTitle,
          gradeDetail,
          index,
        });
      }
    });
    const destroy = ClassesGradeStructure.destroy({
      where: { ClassId: classId, id: { [Op.notIn]: arrId } },
    });
    await updateOrCreate;
    await destroy;
    return { message: "Update class grade structure successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error:
        error.message ||
        "Some error occurred while updating class grade structure!",
    };
  }
};
exports.deleteAClassGradeStructure = async (classId, gradeStructureId) => {
  try {
    await removeAGradeStructure(classId, gradeStructureId);
    return { message: "Delete class grade structure successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error:
        error.message ||
        "Some error occurred while deleting class grade structure!",
    };
  }
};
exports.reOrderGradeStructure = async (classId, srcIndex, desIndex) => {
  try {
    await reOrderGradeStructure(classId, srcIndex, desIndex);
    return { message: "Reorder class grade structure successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error:
        error.message ||
        "Some error occurred while reorder class grade structure!",
    };
  }
};
// const { Users } = await Class.findOne({
//   where: { id: classId },
//   attributes: ["id"],
//   include: {
//     model: User,
//     attributes: arrayAttributes,
//     through: { attributes: ["role"] },
//   },
// });
// const res = { teachers: [], students: [] };
// Users.forEach((element) => {
//   const role = element.UsersClasses.role;
//   if (role === "teacher") res.teachers.push(element);
//   else if (role === "student") res.students.push(element);
// });

// console.log(`invite ${email} to class ${classId}`);
//     const tempclss = Class.build({ id: parseInt(classId) });
//     //const invitecode = await clss.createInviteTeacherCode({ ClassId: classId });
//     const [clss, invitecode] = await Promise.all([
//       Class.findOne({ where: { id: classId }, attributes: ["className"] }),
//       tempclss.createInviteTeacherCode({ ClassId: classId }),
//     ]);
//     const data = {};
//     data.link =
//       process.env.URL_WEB +
//       `/api/classes/${classId}/accept-invitation?itcode=${invitecode.inviteTeacherCode}`;
//     data.email = email;
//     data.user = user.toJSON();
//     data.class = clss.toJSON();
//     const info = await MailServices.sendMailTeacherInvitation(data);
//     console.log("Email sent: " + info.response);
//     return { message: "Create invitation done!" };

// const tempclss = Class.build({ id: parseInt(classId) });

//     const [clss, ...invitecodes] = await Promise.all([
//       Class.findOne({ where: { id: classId }, attributes: ["className"] }),
//       ...emails.map((i) =>
//         tempclss.createInviteTeacherCode({ ClassId: classId })
//       ),
//     ]);

//     const infos = await Promise.all([
//       ...invitecodes.map((e, index) => {
//         const data = {};
//         data.link =
//           process.env.URL_WEB +
//           `/api/classes/${classId}/accept-invitation?itcode=${e.inviteTeacherCode}`;
//         data.email = emails[index];
//         data.user = user.toJSON();
//         data.class = clss.toJSON();
//         return MailServices.sendMailTeacherInvitation(data);
//       }),
//     ]);
