const fs = require("fs");
const path = require("path");

class FilePathHelper {
  static GetApiV1LogFolderPath() {
    const folderPath = "./app/api/v1/logs/";
    return path.resolve(folderPath);
  }
  static GetFileLogPath(fileLogName) {
    const path = FilePathHelper.GetApiV1LogFolderPath() + `\\${fileLogName}`;
    return path;
  }
}

module.exports = FilePathHelper;
