const { instance } = require("../../configs/sequelize.config");
const { DataTypes } = require("sequelize");

class ItemModel {
  static model = instance.define(
    "item",
    {
      itemName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        default: 0,
        validate: {
          min: 0,
        },
      },
      idResource: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      freezeTableName: true,
    }
  );
}

module.exports = ItemModel;
