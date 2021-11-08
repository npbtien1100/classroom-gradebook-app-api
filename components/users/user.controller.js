const { registerValidate } = require("./user.validate");
const { registerService } = require("./user.service");

exports.register = async (req, res) => {
  //Validate class
  const validated = registerValidate(req.body);
  if (validated.error != null)
    return res.status(400).send(validated.error.details[0].message);

  const result = await registerService(req.body);
  if (result.error) {
    res.status(500).send({
      message: result.error,
    });
    return;
  }
  res.send(result);
};
