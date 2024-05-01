const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../configs/jwt.config");

class UserHelper {
  static GetUserToken(req) {
    return req.headers["x-access-token"] || null;
  }
  static async GetUserIdFromToken(token) {
    try {
      const userId = await jwt.verify(
        token,
        jwtConfig.secret,
        jwtConfig.options
      );
      return userId;
    } catch (error) {
      console.log(error);
    }
    return null;
  }
}

module.exports = UserHelper;
