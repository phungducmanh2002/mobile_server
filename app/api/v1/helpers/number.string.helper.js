const bcrypt = require("bcrypt");

class NumberStringHelper {
  static GenerateNumericString(length) {
    let result = "";
    const characters = "0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  static HashString(value) {
    return bcrypt.hashSync(value, 8);
  }
  static CompareStringAndHash(str, hashString) {
    return bcrypt.compareSync(str, hashString);
  }
}

module.exports = NumberStringHelper;
