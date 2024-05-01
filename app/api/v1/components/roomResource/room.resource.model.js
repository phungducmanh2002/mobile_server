const { instance } = require("../../configs/sequelize.config");
const { DataTypes } = require("sequelize");

class RoomResourceModel {
  static model = instance.define(
    "room_resource",
    {
      idRoom: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
      },
      idResource: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
}

module.exports = RoomResourceModel;
