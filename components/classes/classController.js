const classService = require("./classService");

exports.createAClass = async (req, res) => {
  if (!req.body.className) {
    res.status(400).send({
      error: "Class name can not be empty!",
    });
    return;
  } else {
    const result = await classService.createClass(req);
    if (result.error) {
      res.status(500).send({
        message: result.error,
      });
      return;
    }
    res.send(result);
  }
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
  const result = await classService.deleteAClass(req.params.id);
  if (result.error) {
    res.status(500).send({
      message: result.error,
    });
    return;
  }
  res.send(result);
};
