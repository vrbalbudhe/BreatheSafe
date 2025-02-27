const express = require("express");
const {
  ParcelCompanyRegistration,
} = require("../../controllers/AuthParcelCoControllers/signup");
const ParcelCompanyLogin = require("../../controllers/AuthParcelCoControllers/login");
const router = express.Router();

router.post("/coregister", ParcelCompanyRegistration);
router.post("/cologin", ParcelCompanyLogin);

module.exports = router;
