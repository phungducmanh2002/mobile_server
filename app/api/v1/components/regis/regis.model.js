const { instance } = require("../../configs/sequelize.config");
const { DataTypes, where, QueryTypes } = require("sequelize");
const { Op } = require("sequelize");
const RoomSemesterModel = require("../roomSemester/room.semester.model");
const sequelizeConfig = require("../../configs/sequelize.config");

class RegisModel {
  static model = instance.define(
    "regis",
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
      idUser: {
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

RegisModel.model.addHook("beforeCreate", async (regis, options) => {
  const idRoomSemester = regis.idRoomSemester;
  const idUser = regis.idUser;
  const sql = `
  select * 
  from regis
  where idRoomSemester
  in (select id 
  from room_semester
  where idSemester in (select idSemester from room_semester where id = :idRoomSemester))
  and idUser = :idUser
  `;

  return sequelizeConfig.instance
    .query(sql, {
      replacements: {
        idRoomSemester: idRoomSemester,
        idUser: idUser,
      },
      type: QueryTypes.SELECT,
    })
    .then((rsl) => {
      if (rsl.length > 0) {
        throw new Error("Không thể đăng kí 2 phòng trong một học kì!");
      }
    });
});

module.exports = RegisModel;
