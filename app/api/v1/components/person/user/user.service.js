const UserModel = require("../../person/user/user.model");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../../configs/jwt.config");
const UserValidation = require("./user.validation");
const { where } = require("sequelize");
const NumberStringHelper = require("../../../helpers/number.string.helper");
const ResourceService = require("../../resources/resource.service");

class UserService {
  static GetUserByEmail = async (email) => {
    return await UserModel.model.findOne({ where: { email: email } });
  };
  static GenerateUserToken = (userId) => {
    const token = jwt.sign({ id: userId }, jwtConfig.secret, jwtConfig.options);
    return token;
  };
  static GetUserById = async (userId) => {
    return await UserModel.model.findByPk(userId);
  };
  static GetUserRole = async (userId) => {
    const user = await UserService.GetUserById(userId);
    const roles = [];
    if (!user) {
      return roles;
    }
    if (user.idCustomer) {
      roles.push("CUSTOMER");
    }
    if (user.idHotelier) {
      roles.push("HOTELIER");
    }
    if (user.idStaff) {
      const staffRole = await StaffService.GetStaffRole(user.idStaff);
      roles.push(staffRole || "STAFF");
    }
    return roles;
  };
  static CreateUser = async (userDto) => {
    const user = UserValidation.CleanUserDtoSignup(userDto);
    return await UserModel.model.create(user);
  };
  static FindUserByEmail = async (email) => {
    return await UserModel.model.findOne({
      where: {
        email: email,
      },
    });
  };
  static FindUserById = async (userId) => {
    return await UserModel.model.findByPk(userId);
  };
  static GenerateActivationCode = async (userId) => {
    const user = await UserService.FindUserById(userId);
    if (!user) {
      return null;
    }
    const activationCode = NumberStringHelper.GenerateNumericString(5);
    user.activationCode = NumberStringHelper.HashString(activationCode);

    const userNew = await user.save();

    if (userNew) {
      return { code: activationCode, email: user.email };
    }
    return null;
  };
  static GenerateActivationCode2 = async (user) => {
    const activationCode = NumberStringHelper.GenerateNumericString(5);
    user.activationCode = NumberStringHelper.HashString(activationCode);
    const userNew = await user.save();
    if (userNew) {
      return { code: activationCode, email: user.email };
    }
    return null;
  };
  static ActiveAccount = async (user, activationCode) => {
    if (!user) {
      return null;
    }
    if (user.accountStatus == 0) {
      if (
        NumberStringHelper.CompareStringAndHash(
          activationCode,
          user.activationCode
        )
      ) {
        user.activationCode = null;
        user.accountStatus = 1;
        await user.save();
        return true;
      }
    }
    return false;
  };
  static UpdateAvatar = async (user, resourceId) => {
    if (!user || !resourceId) {
      return null;
    }
    const oldAvatarId = user.idResource;
    if (oldAvatarId) {
      await ResourceService.RemoveResoruce(oldAvatarId);
    }
    user.idResource = resourceId;
    return await user.save();
  };
  static UpdateUser = async (user, userDto) => {
    if (!user) {
      return null;
    }
    const userDtoNew = UserValidation.ClearUserDtoForEdit2(userDto);
    if (userDtoNew == null) return null;

    user.firstName = userDtoNew.firstName;
    user.lastName = userDtoNew.lastName;
    user.gender = userDtoNew.gender;

    return await user.save();
  };
}

module.exports = UserService;
