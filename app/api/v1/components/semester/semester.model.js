const { instance } = require("../../configs/sequelize.config");
const { DataTypes, where } = require("sequelize");
const { Op } = require("sequelize");

class SemesterModel {
  static model = instance.define(
    "semester",
    {
      semesterName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
      roomPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        default: 0,
        validate: {
          min: 0,
        },
      },
      electricPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        default: 0,
        validate: {
          min: 0,
        },
      },
      waterPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
        default: 0,
        validate: {
          min: 0,
        },
      },
      startAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      endAt: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          contrastStartAtEndAt() {
            if (this.startAt && this.endAt && this.startAt >= this.endAt) {
              throw new Error(
                "Ngày kết thúc học kì phải lớn hơn ngày bắt đầu học kì!"
              );
            }
          },
        },
      },
    },
    {
      freezeTableName: true,
    }
  );
}

SemesterModel.model.addHook("beforeCreate", async (semester, options) => {
  return SemesterModel.model
    .findOne({
      where: {
        [Op.or]: {
          startAt: { [Op.between]: [semester.startAt, semester.endAt] },
          endAt: { [Op.between]: [semester.startAt, semester.endAt] },
        },
      },
    })
    .then((result) => {
      if (result) {
        throw new Error("Semester date bị gối đầu nhau!");
      }
    });
});

module.exports = SemesterModel;
