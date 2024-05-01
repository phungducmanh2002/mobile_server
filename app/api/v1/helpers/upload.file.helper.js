const multer = require("multer");

class UploadFileHelper {
  static UploadFile = multer({ storage: multer.memoryStorage() });
}

module.exports = UploadFileHelper;
