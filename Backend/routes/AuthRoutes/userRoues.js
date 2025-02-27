const express = require("express");
const {
  userRegistration,
} = require("../../controllers/AuthControllers/signup");
const { userLogin } = require("../../controllers/AuthControllers/login");
const {
  checkLoginApi,
} = require("../../controllers/AuthControllers/loginOpenApi");
const { logoutUser } = require("../../controllers/AuthControllers/logout");

const router = express.Router();

router.post("/signup", userRegistration);
router.post("/login", userLogin);
router.get("/logout", logoutUser);

router.get("/checkLog", checkLoginApi);

module.exports = router;
