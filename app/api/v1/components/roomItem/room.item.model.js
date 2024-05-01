const { instance } = require("../../configs/sequelize.config");
const { DataTypes } = require("sequelize");

class RoomItemModel {
  static model = instance.define(
    "room_item",
    {
      idRoom: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
      },
      idItem: {
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

module.exports = RoomItemModel;
