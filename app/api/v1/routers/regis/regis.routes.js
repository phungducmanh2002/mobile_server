const express = require("express");
const RegisController = require("../../components/regis/regis.controller");
const router = express.Router();

router.post("/create", RegisController.CreateRegis);

module.exports = router;
