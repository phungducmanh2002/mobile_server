const { instance } = require("../../configs/sequelize.config");
const { DataTypes, where } = require("sequelize");
const { Op } = require("sequelize");

class BillModel {
  static model = instance.define(
    "bill",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idElectricWater: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
      },
      idRegis: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: false,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        default: false,
        allowNull: false,
        unique: false,
      },
    },
    {
      freezeTableName: true,
    }
  );
}

module.exports = BillModel;
