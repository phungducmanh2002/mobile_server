const log4js = require("log4js");
const FilePathHelper = require("../helpers/file.path.helper");

const requestInfoLogPath = FilePathHelper.GetFileLogPath("request.info.log");
const signupLogPath = FilePathHelper.GetFileLogPath("signup.log");

log4js.configure({
  appenders: {
    ["signup"]: { type: "file", filename: signupLogPath },
  },
  categories: {
    default: { appenders: ["signup"], level: "all" },
  },

  appenders: {
    ["request info"]: { type: "file", filename: requestInfoLogPath },
  },
  categories: {
    default: { appenders: ["request info"], level: "info" },
  },
});

class ServerFileLogger {
  static InfoLogger = log4js.getLogger("request info");
  static SignupLogger = log4js.getLogger("signup");
}

module.exports = ServerFileLogger;
