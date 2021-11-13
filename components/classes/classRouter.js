const express = require("express");
const router = express.Router();
const {
  createAClass,
  getAClass,
  getAllClasses,
  updateAClass,
  deleteAClass,
} = require("./classController");
const { authenticateByJwt } = require("../auth/auth.services");

/* GET users listing. */
router.get("/", authenticateByJwt, getAllClasses);
router.post("/", authenticateByJwt, createAClass);
router.post("/test", (req, res) => {
  const body = req.body;
  console.log({ body });
  res.send("Post thanh cong!");
});
router.get("/:id", authenticateByJwt, getAClass);
router.put("/:id", authenticateByJwt, updateAClass);
router.delete("/:id", authenticateByJwt, deleteAClass);

module.exports = router;
