const { instance } = require("../../configs/sequelize.config");
const { DataTypes } = require("sequelize");

class RoomModel {
  static model = instance.define(
    "room",
    {
      idRoomCollection: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
      },
      roomName: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      roomGender: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0,
        validate: {
          isIn: [[0, 1]],
          /**
           * Nam
           * Nữ
           */
        },
      },
      roomStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0,
        validate: {
          isIn: [[0, 1]],
          /**
           * Active
           * Disable
           */
        },
      },
      roomAcreage: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      slot: {
        type: DataTypes.INTEGER,
        default: 0,
        allowNull: true,
        unique: false,
      },
    },
    {
      freezeTableName: true,
      indexes: [
        {
          unique: true,
          fields: ["roomName", "idRoomCollection"],
        },
      ],
    }
  );
}

module.exports = RoomModel;
