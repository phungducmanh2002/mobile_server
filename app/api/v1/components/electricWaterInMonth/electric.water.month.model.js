const { instance } = require("../../configs/sequelize.config");
const { DataTypes, where } = require("sequelize");
const { Op } = require("sequelize");

class ElectricWaterModel {
  static model = instance.define(
    "electricWater",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idRoomSemester: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
      },
      electricNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
      },
      waterNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
      },
      month: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
      },
    },
    {
      freezeTableName: true,
      indexes: [
        {
          unique: true,
          fields: ["idRoomSemester", "month", "year"], // Thiết lập ràng buộc duy nhất cho kết hợp của năm và tháng
        },
      ],
    }
  );
}

module.exports = ElectricWaterModel;
