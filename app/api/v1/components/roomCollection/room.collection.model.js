const { instance } = require("../../configs/sequelize.config");
const { DataTypes } = require("sequelize");

class RoomCollectionModel {
  static model = instance.define(
    "roomCollection",
    {
      roomCollectionName: {
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

module.exports = RoomCollectionModel;
