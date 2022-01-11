const express = require("express");
const { customAuthenticateByJwt } = require("../auth/auth.services");
const router = express.Router();
const AdminController = require("./admin.controller");

router.post("/login", AdminController.handleLogin);

router.get(
  "/total-report",
  customAuthenticateByJwt,
  AdminController.getTotalReport
);

//class API
router.get("/classes", customAuthenticateByJwt, AdminController.getAllClasses);
router.get(
  "/classes/:classId",
  customAuthenticateByJwt,
  AdminController.getAClass
);

//user API
router.get("/users", customAuthenticateByJwt, AdminController.getAllUsers);
router.get("/users/:userId", customAuthenticateByJwt, AdminController.getAUser);
router.put(
  "/users/:userId",
  customAuthenticateByJwt,
  AdminController.updateAUser
);

//admin API
router.get("/", customAuthenticateByJwt, AdminController.getAllAdmins);
router.post("/", customAuthenticateByJwt, AdminController.createAnAdmin);
router.get("/:adminId", customAuthenticateByJwt, AdminController.getAnAdmin);
router.put("/:adminId", customAuthenticateByJwt, AdminController.updateAnAdmin);

module.exports = router;
