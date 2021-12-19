const {
  checkIsTeacherOfAClass,
  checkIsMemberOfAClass,
} = require("../modelAssociation/usersClasses/usersClassesServices");
const classService = require("./classService");
const ClassesGradeStructureServices = require("../modelAssociation/classesGradeStructure/classesGradeStructureService");
const StudentClassServices = require("../modelAssociation/studentsClasses/studentsClassesServices");
const {
  validateCreateClass,
  validateInvitation,
  validateCreateClassGradeStructure,
  validateReorderClassGradeStructure,
  validateUpdateClassGradeStructure,
} = require("./classValidate");
const {
  MapVirtualAndReadlStudent,
  CaculateAverageOfEachStudent,
} = require("./classUtil");

exports.createAClass = async (req, res) => {
  //Validate class
  const validated = validateCreateClass(req.body);
  if (validated.error != null)
    return res.status(400).send(validated.error.details[0].message);

  //Create class
  const result = await classService.createClass(req);
  if (result.error) {
    res.status(500).send({
      message: result.error,
    });
    return;
  }
  res.send(result);
};

exports.getAllClasses = async (req, res) => {
  const options = { orderOption: [["id", "DESC"]] };
  const result = await classService.getAllClasses(
    ["id", "className", "classSection", "subject", "room"],
    options,
    req.user
  );
  res.json(result);
};

exports.getAClass = async (req, res) => {
  const check = await checkIsMemberOfAClass(req.params.id, req.user);
  if (!check) {
    res.status(403).json({ message: "You are not allowed!" });
    return;
  }
  const result = await classService.getOneClassByID(
    req.params.id,
    ["id", "className", "classSection", "subject", "room"],
    req.user.id
  );
  res.json(result);
};

exports.updateAClass = async (req, res) => {
  //check user is teacher of the class
  const check = await checkIsTeacherOfAClass(req.params.id, req.user);
  if (!check) {
    res.status(403).json({ message: "You are not allowed!" });
    return;
  }
  //Validate class
  const validated = validateCreateClass(req.body);
  if (validated.error != null)
    return res.status(400).send(validated.error.details[0].message);
  // update class
  const { className, classSection, subject, room } = req.body;
  const result = await classService.updateAClass(req.params.id, {
    className,
    classSection,
    subject,
    room,
  });
  if (result.error) {
    res.status(500).send({
      message: result.error,
    });
    return;
  }
  res.json(result);
};

exports.deleteAClass = async (req, res) => {
  //check user is teacher of the class
  const check = await checkIsTeacherOfAClass(req.params.id, req.user);
  if (!check) {
    res.status(403).json({ message: "You are not allowed!" });
    return;
  }

  const result = await classService.deleteAClass(req.params.id);
  if (result.error) {
    res.status(500).send({
      message: result.error,
    });
    return;
  }
  res.send(result);
};

exports.createDataSample = async (req, res) => {
  try {
    await classService.createDataSample();
    res.send({ message: "create data saample successfully!" });
  } catch (error) {
    res.status(501).send("Failed!");
  }
};
exports.getAllPeopleInClass = async (req, res) => {
  try {
    const people = await classService.getAllPeopleInClass(req.params.id, [
      "id",
      "name",
      "image",
    ]);
    res.json(people);
  } catch (error) {
    res.status(error.status || 501).json({ message: error.message });
  }
};
exports.getStudentJoinLink = async (req, res) => {
  try {
    const result = await classService.getJoinLink(req.params.id);
    if (result.error) {
      res.status(500).send({
        message: result.error,
      });
      return;
    }
    res.send(result);
  } catch (error) {
    res.status(error.status || 501).json({ message: error.message });
  }
};
exports.getTeacherJoinLink = async (req, res) => {
  try {
    const result = await classService.getTeacherJoinLink(req.params.id);
    if (result.error) {
      res.status(500).send({
        message: result.error,
      });
      return;
    }
    res.send(result);
  } catch (error) {
    res.status(error.status || 501).json({ message: error.message });
  }
};
exports.joinUserToAClass = async (req, res) => {
  try {
    const sjc = req.query.sjc;
    const tjc = req.query.tjc;
    let result;
    if (!sjc && !tjc) return res.status(400).send("Empty query parameter!");
    else if (tjc) {
      result = await classService.joinTeacherToAClass(
        req.user,
        req.params.id,
        tjc
      );
    } else if (sjc) {
      result = await classService.joinStudentToAClass(
        req.user,
        req.params.id,
        sjc
      );
    }
    if (result.error) {
      res.status(500).send({
        message: result.error,
      });
      return;
    }
    res.send(result);
  } catch (error) {
    res.status(error.status || 501).json({ message: error.message });
  }
};
exports.inviteStudentsToAClass = async (req, res) => {
  //check user is teacher of the class
  const check = await checkIsTeacherOfAClass(req.params.id, req.user);
  if (!check) return res.status(403).json({ message: "You are not allowed!" });
  //Validate body form
  const validated = validateInvitation(req.body);
  if (validated.error != null)
    return res.status(400).send(validated.error.details[0].message);

  const result = await classService.inviteStudentsToAClass(
    req.params.id,
    req.body.emails,
    req.user
  );
  if (result.error) {
    res.status(500).send({
      message: result.error,
    });
    return;
  }
  res.send(result);
};
exports.inviteTeachersToAClass = async (req, res) => {
  try {
    //check user is teacher of the class
    const check = await checkIsTeacherOfAClass(req.params.id, req.user);
    if (!check)
      return res.status(403).json({ message: "You are not allowed!" });
    //Validate body form
    const validated = validateInvitation(req.body);
    if (validated.error != null)
      return res.status(400).send(validated.error.details[0].message);

    const result = await classService.inviteTeachersToAClass(
      req.params.id,
      req.body.emails,
      req.user
    );
    if (result.error) {
      res.status(500).send({
        message: result.error,
      });
      return;
    }
    res.send(result);
  } catch (err) {
    res.status(err.status || 501).json({ message: err.message });
  }
};
exports.joinTeacherToAClass = async (req, res) => {
  try {
    if (!req.query.itcode)
      return res.status(400).send("Empty query parameter!");
    const result = await classService.joinTeacherToAClass(
      req.params.id,
      req.user,
      req.query.tjc
    );
    res.send(result);
  } catch (err) {
    res.status(err.status || 501).json({ message: err.message });
  }
};
exports.getClassGradeStructure = async (req, res) => {
  try {
    const options = { orderOption: [["index"]] };
    const result = await classService.getClassGradeStructure(
      req.params.id,
      ["id", "ClassId", "index", "gradeTitle", "gradeDetail"],
      options
    );
    res.json(result);
  } catch (error) {
    res.status(error.status || 501).json({ message: error.message });
  }
};
exports.createAClassGradeStructure = async (req, res) => {
  //check user is teacher of the class
  const check = await checkIsTeacherOfAClass(req.params.id, req.user);
  if (!check) {
    res.status(403).json({ message: "You are not allowed!" });
    return;
  }
  //Validate class
  const validated = validateCreateClassGradeStructure(req.body.data);
  if (validated.error != null)
    return res.status(400).send(validated.error.details[0].message);
  //Create class grade structure
  const result = await classService.createAClassGradeStructure(
    req.params.id,
    req.body.data
  );
  if (result.error) {
    res.status(500).send({
      message: result.error,
    });
    return;
  }
  res.json(result);
};
exports.updateAClassGradeStructure = async (req, res) => {
  //check user is teacher of the class
  const check = await checkIsTeacherOfAClass(req.params.id, req.user);
  if (!check) {
    res.status(403).json({ message: "You are not allowed!" });
    return;
  }
  //Validate class
  const validated = validateUpdateClassGradeStructure(req.body.data);
  if (validated.error != null)
    return res.status(400).send(validated.error.details[0].message);
  // update class grade structure
  const result = await classService.updateAClassGradeStructure(
    req.params.id,
    req.body.data
  );
  if (result.error) {
    res.status(500).send({
      message: result.error,
    });
    return;
  }
  res.json(result);
};
exports.deleteAClassGradeStructure = async (req, res) => {
  //check user is teacher of the class
  const check = await checkIsTeacherOfAClass(req.params.id, req.user);
  if (!check) {
    res.status(403).json({ message: "You are not allowed!" });
    return;
  }
  // delete class grade structure
  const result = await classService.deleteAClassGradeStructure(
    req.params.id,
    req.params.gradeStructureId
  );
  if (result.error) {
    res.status(500).send({
      message: result.error,
    });
    return;
  }
  res.json(result);
};
exports.reOrderGradeStructure = async (req, res) => {
  //check user is teacher of the class
  const check = await checkIsTeacherOfAClass(req.params.id, req.user);
  if (!check) {
    res.status(403).json({ message: "You are not allowed!" });
    return;
  }
  //Validate query
  const validated = validateReorderClassGradeStructure(req.query);
  if (validated.error != null)
    return res.status(400).send(validated.error.details[0].message);
  // reorder grade structure
  const result = await classService.reOrderGradeStructure(
    req.params.id,
    parseInt(req.query.srcIndex),
    parseInt(req.query.desIndex)
  );
  if (result.error) {
    res.status(500).send({
      message: result.error,
    });
    return;
  }
  res.json(result);
};
exports.test = async (req, res) => {
  try {
    const result = await classService.test(req.params.id, req.user);
    //res.json(result);
    res.send({ message: "Test successfully!" });
  } catch (error) {
    res.status(501).send("Failed!");
  }
};

exports.getGradeBoard = async (req, res) => {
  //TODO: //
  const { classId } = req.params;
  try {
    //Check role
    const isTeacher = await checkIsTeacherOfAClass(classId, req.user);

    if (!isTeacher)
      return req.status(400).json({
        success: false,
        message: "Access denied",
      });
    //get grade structure list
    const gradeStructureList =
      await ClassesGradeStructureServices.getAllClassGradeStructure(classId);
    // get average point
    const averagePoint = await StudentClassServices.getAveragePointsOfOneClass(
      classId
    );

    //GET All Virtual Student
    const studentVirtualInClass =
      await StudentClassServices.getAllVirtualStudent(classId);
    //Get All Real Student
    const realStudents = await classService.getAllStudentInClass(classId);
    //Create new Student Classes if Not Exist
    await Promise.all(
      realStudents.map(async (student) => {
        const DoNotAssignStudentId = student.student_id == null;
        //console.log(student);
        if (DoNotAssignStudentId) return;
        const el = {
          fullName: student.name,
          ClassId: student.ClassId,
          student_id: student.student_id,
        };
        // console.log({ el });
        await StudentClassServices.CreateIfNotExistStudentsClasses(el);
      })
    );
    //Map virtual student with real student
    const allStudent = MapVirtualAndReadlStudent(
      studentVirtualInClass,
      realStudents
    );

    //get student import from DB
    let studentGrades = [];
    await Promise.all(
      allStudent.map(async (el) => {
        let result = await StudentClassServices.getAllCompositionStudent(
          classId,
          el.student_id
        );
        studentGrades.push(result);
      })
    );

    //Caculate DTB of student
    studentGrades = studentGrades.map((el) => {
      return CaculateAverageOfEachStudent(el);
    });

    res.json({
      success: true,
      gradeStructureList,
      averagePoint,
      allStudent,
      studentGrades,
    });
  } catch (error) {
    res.status(error.status || 501).json({ message: error.message });
  }
};
