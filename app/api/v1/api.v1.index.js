const express = require("express");
const ApiRouter = require("./routers/api.v1.routes");
const MyLogger = require("./logs/loger");
const UserService = require("./components/person/user/user.service");
const router = express.Router();
require("./components/associated/accociated.components");

router.use(MyLogger.LogRequestInfo, ApiRouter);

module.exports = router;
