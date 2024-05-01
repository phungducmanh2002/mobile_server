const { instance } = require("../../../configs/sequelize.config");
const { DataTypes } = require("sequelize");

class UserModel {
  static model = instance.define(
    "user",
    {
      firstName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: [0, 30],
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          len: [0, 30],
          notEmpty: true,
        },
      },
      gender: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isIn: [[0, 1, 2]],
          /**
           * Nam
           * Nữ
           * Khác
           */
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accountStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          isIn: [[0, 1, 2]],
          /**
           * Chưa kích hoạt
           * Đang hoạt động
           * Đã khóa
           */
        },
      },
      idResource: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      idRole: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      activationCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      changePassCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
    }
  );
}

module.exports = UserModel;
