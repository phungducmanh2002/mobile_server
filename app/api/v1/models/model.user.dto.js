class UserDto {
  constructor() {
    this.id = null;
    this.firstName = null;
    this.lastName = null;
    this.gender = null;
    this.email = null;
    this.password = null;
    this.idRole = null;
    this.idResource = null;
    this.accountStatus = null;
    this.activationCode = null;
    this.changePassCode = null;
    this.createdAt = null;
    this.updatedAt = null;
    this.userRole = null;
  }

  static Mapper(userModel) {
    const userDto = new UserDto();
    for (const [key, value] of Object.entries(userDto)) {
      userDto[key] = userModel?.[key];
    }
    return userDto;
  }

  hiddenPrivateInfo() {
    delete this.password;
    delete this.activationCode;
    delete this.changePassCode;
    return this;
  }
}

module.exports = UserDto;
