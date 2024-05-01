const NumberStringHelper = require("../helpers/number.string.helper");

class DefaultDbData {
  static UserData = [
    {
      firstName: "Phùng",
      lastName: "Đức Mạnh",
      gender: 1,
      email: "admin@gmail.com",
      password: NumberStringHelper.HashString("1"),
      accountStatus: 1,
      idRole: 1,
    },
    {
      firstName: "Phùng",
      lastName: "Đức Mạnh",
      gender: 1,
      email: "staff@gmail.com",
      password: NumberStringHelper.HashString("1"),
      accountStatus: 1,
      idRole: 2,
    },
    {
      firstName: "Phùng",
      lastName: "Đức Mạnh",
      gender: 1,
      email: "student@gmail.com",
      password: NumberStringHelper.HashString("1"),
      accountStatus: 1,
      idRole: 3,
    },
  ];
  static RoleData = [
    { roleName: "AMDIN" },
    { roleName: "STAFF" },
    { roleName: "STUDENT" },
  ];
}

module.exports = DefaultDbData;
