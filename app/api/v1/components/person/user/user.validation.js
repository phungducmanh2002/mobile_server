const NumberStringHelper = require("../../../helpers/number.string.helper");

class UserValidation {
  static CleanUserDtoSignup(userDto) {
    const result = {};
    result.firstName = userDto.firstName;
    result.lastName = userDto.lastName;
    result.gender = userDto.gender;
    result.email = userDto.email;
    result.password = NumberStringHelper.HashString(userDto.password);
    result.idRole = 3;
    result.activationCode = null;
    result.accountStatus = 0;
    return result;
  }
  static ClearUserDtoForEdit(userDto) {
    const blackList = [
      "activationCode",
      "password",
      "accountStatus",
      "idRole",
      "email",
      "changePassCode",
    ];
    const newUserDto = {};
    for (const [key, value] of Object.entries(userDto)) {
      if (blackList.includes(key)) {
        continue;
      }
      newUserDto[key] = value;
    }
    return newUserDto;
  }
  static ClearUserDtoForEdit2(userDto) {
    if (!userDto) {
      return null;
    }
    const result = {};
    if (userDto.firstName != null) {
      result.firstName = userDto.firstName;
    }
    if (userDto.lastName != null) {
      result.lastName = userDto.lastName;
    }
    if (userDto.gender != null) {
      result.gender = userDto.gender;
    }
    return result;
  }
}

module.exports = UserValidation;
