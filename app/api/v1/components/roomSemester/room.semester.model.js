const { instance } = require("../../configs/sequelize.config");
const { DataTypes } = require("sequelize");

class RoomSemesterModel {
  static model = instance.define(
    "room_semester",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idRoom: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
      },
      idSemester: {
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

module.exports = RoomSemesterModel;
