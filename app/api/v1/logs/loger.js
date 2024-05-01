const ServerFileLogger = require("../configs/log4js.config");

class MyLogger {
  static LogRequestInfo = [
    (req, res, next) => {
      const requestInfo = {
        METHOD: req.method,
        URL: req.url,
        IP: req.ip,
        HEADER: req.headers,
      };
      ServerFileLogger.InfoLogger.info(requestInfo);
      next();
    },
  ];
}

module.exports = MyLogger;
