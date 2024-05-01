const { instance } = require("../../configs/sequelize.config");
const { DataTypes } = require("sequelize");

class RoleModel {
  static model = instance.define(
    "role",
    {
      roleName: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
    },
    {
      freezeTableName: true,
    }
  );
}

module.exports = RoleModel;
