const { instance } = require("../../configs/sequelize.config");
const { DataTypes } = require("sequelize");

class ResourceModel {
  static model = instance.define(
    "resource",
    {
      data: {
        type: DataTypes.BLOB,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
}

module.exports = ResourceModel;
