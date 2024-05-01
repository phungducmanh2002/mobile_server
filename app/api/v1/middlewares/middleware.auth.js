const UserService = require("../components/person/user/user.service");
const jwtConfig = require("../configs/jwt.config");
const jwt = require("jsonwebtoken");

class MiddleWare {
  static GetUserToken(req) {
    const token = req.headers["authorization"]?.replace("Bearer ", "");
    return token;
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
  static BindUser() {
    return [
      async (req, res, next) => {
        const token = MiddleWare.GetUserToken(req);
        console.log(`TOKEN: ${token}`);
        if (token) {
          const tokenDecode = await MiddleWare.GetUserIdFromToken(token);
          const userId = tokenDecode?.id;
          if (userId) {
            const user = await UserService.GetUserById(userId);
            req.user = user;
          }
        }
        next();
      },
    ];
  }
  static isRole(ROLE) {
    return [
      MiddleWare.BindUser(),
      (req, res, next) => {
        if (req.user) {
          res.status(403).json({ msg: "Vui lòng đăng nhập!" });
          return;
        }
      },
    ];
  }
}

module.exports = MiddleWare;
