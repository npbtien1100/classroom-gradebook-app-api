const express = require("express");
const router = express.Router();
const {
  createAClass,
  getAClass,
  getAllClasses,
  updateAClass,
  deleteAClass,
  createDataSample,
  test
} = require("./classController");
const { authenticateByJwt } = require("../auth/auth.services");

/* GET users listing. */
router.get("/test", test);
router.get("/", authenticateByJwt, getAllClasses);
router.post("/", createAClass);
router.get('/create-data-sample', createDataSample);
router.get("/:id", authenticateByJwt, getAClass);
router.put("/:id", authenticateByJwt, updateAClass);
router.delete("/:id", authenticateByJwt, deleteAClass);

module.exports = router;
 