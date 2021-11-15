const {
  checkIsTeacherOfAClass,
} = require("../modelAssociation/usersClasses/usersClassesServices");
const classService = require("./classService");
const { validateCreateClass } = require("./classValidate");

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
    options
  );
  res.json(result);
};

exports.getAClass = async (req, res) => {
  const result = await classService.getOneClassByID(req.params.id, [
    "id",
    "className",
    "classSection",
    "subject",
    "room",
  ]);
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
exports.joinStudentToAClass = async (req, res) => {
  try {
    await classService.joinStudentToAClass(studentId, classId);
    await classService.joinTeacherToAClass(teacherId, classId, t_code);
  } catch (error) {
    res.status(error.status || 501).json({ message: error.message });
  }
};
exports.inviteTeacherToAClass = async (req, res) => {
  try {
    //check user is teacher of the class
    const check = await checkIsTeacherOfAClass(req.params.id, req.user);
    if (!check)
      return res.status(403).json({ message: "You are not allowed!" });

    const result = await classService.inviteTeacherToAClass(
      req.params.id,
      req.query.email
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
  } catch (err) {
    res.status(err.status || 501).json({ message: err.message });
  }
};
exports.test = async (req, res) => {
  try {
    const result = await classService.test(req.params.id, req.user);
    res.send({ message: "Test successfully!" });
  } catch (error) {
    res.status(501).send("Failed!");
  }
};
