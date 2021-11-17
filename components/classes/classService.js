const Class = require("./classModel");
const ClassesInviteCodes = require("../../components/modelAssociation/classesInviteCodes/classesInviteCodes");
const MailServices = require("../mailServices/mail.service");
const {
  addUserToClass,
  checkIsMemberOfAClass,
  updateRole,
} = require("../modelAssociation/usersClasses/usersClassesServices");
exports.createClass = async (req) => {
  const { className, classSection, subject, room } = req.body;
  try {
    await Class.create({
      className,
      classSection,
      subject,
      room,
    });
    return { message: "Create class successfully!" };
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while creating Class!",
    };
  }
};
exports.getOneClassByID = async (classID, arrayAttributes) => {
  try {
    const foundClass = await Class.findOne({
      where: { id: classID },
      attributes: arrayAttributes,
    });
    return foundClass;
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
      const role = element.UsersClasses.role;
      if (role === "teacher")
        res.teachers.teachers_list.push({
          ...element.toJSON(),
          UsersClasses: role,
        });
      else if (role === "student")
        res.students.students_list.push({
          ...element.toJSON(),
          UsersClasses: role,
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
    const tempclss = Class.build({ id: parseInt(classId) });

    const [clss, ...invitecodes] = await Promise.all([
      Class.findOne({ where: { id: classId }, attributes: ["className"] }),
      ...emails.map((i) =>
        tempclss.createInviteTeacherCode({ ClassId: classId })
      ),
    ]);

    const infos = await Promise.all([
      ...invitecodes.map((e, index) => {
        const data = {};
        data.link =
          process.env.URL_WEB +
          `/api/classes/${classId}/accept-invitation?itcode=${e.inviteTeacherCode}`;
        data.email = emails[index];
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
exports.joinTeacherToAClass = async (classId, user, inviteCode) => {
  try {
    const checkInviteCode = await ClassesInviteCodes.findOne({
      where: {
        ClassId: parseInt(classId),
        inviteTeacherCode: inviteCode,
      },
    });
    if (!checkInviteCode) return { error: "Wrong invitation code!" };

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
    const joinLink = `${process.env.URL_WEB}/api/classes/${classId}/join?cjc=${clss.joinCode}`;
    return { joinLink: joinLink };
  } catch (err) {
    console.error(err);
    return {
      error: err.message || "Some error occurred while joining class!",
    };
  }
};
exports.joinStudentToAClass = async (user, classId, cjc) => {
  try {
    //validate the class join code
    const clss = await Class.findOne({ where: { id: classId, joinCode: cjc } });
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
    const joinLink = `${process.env.URL_WEB}/api/classes/${classId}/join?cjc=${clss.joinCode}`;

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
  } catch (error) {
    console.error(error);
    return {
      error: error.message || "Some error occurred while inviting teacher!",
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
