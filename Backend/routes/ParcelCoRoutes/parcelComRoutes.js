const express = require("express");
const {
  ParcelsAllInfo,
} = require("../../controllers/ParcelControllers/ParcelsAllInfo");
const router = express.Router();

router.post("/specific", ParcelsAllInfo);

module.exports = router;
