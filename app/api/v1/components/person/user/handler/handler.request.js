class UserRequestHandler {
  static GetAccountInRequest(req) {
    const email = req?.body?.email;
    const password = req?.body?.password;
    const loginType = req?.params?.loginType;
    if (email && password && loginType) return { email, password, loginType };
    return null;
  }
  static GetBearerTokenInRequest(req) {
    const bearerToken = req.headers["authorization"];
    if (!bearerToken) return null;
    return bearerToken.replace("Bearer ", "");
  }
}

module.exports = UserRequestHandler;
