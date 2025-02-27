const express = require("express");
const {
  UserAllInfo,
} = require("../../controllers/UserControllers/UserAllInfo");
const router = express.Router();

router.post("/specific", UserAllInfo);

module.exports = router;
