const { where, QueryTypes } = require("sequelize");
const RoomSemesterModel = require("../roomSemester/room.semester.model");
const RegisModel = require("./regis.model");
const sequelizeConfig = require("../../configs/sequelize.config");
const BillModel = require("../bill/bill.model");

class RegisService {
  static async CreateRegis(idUser, idSemester, idRoom) {
    const roomSemester = await RoomSemesterModel.model.findOne({
      where: { idSemester: idSemester, idRoom: idRoom },
    });

    if (!roomSemester) {
      return null;
    }

    const registedsByUserFromSemester =
      await RegisService.GetRegisOfUserFromSemester(idSemester, idUser);

    if (registedsByUserFromSemester.length > 1) {
      return null;
    }

    const transaction = await sequelizeConfig.instance.transaction();

    try {
      const newRegis = await RegisModel.model.create(
        {
          idRoomSemester: roomSemester.id,
          idUser: idUser,
        },
        {
          transaction: transaction,
        }
      );

      const newRegisBill = await BillModel.model.create(
        {
          idRegis: newRegis.id,
          title: "Hóa đơn tiền phòng",
          status: false,
        },
        {
          transaction: transaction,
        }
      );

      await transaction.commit();

      return newRegis;
    } catch (error) {
      console.log(error.message);
      await transaction.rollback();
      return null;
    }
  }
  static async GetRegisOfUserFromSemester(idSemester, idUser) {
    const sql = `
    select * from regis
    where idRoomSemester in (select id from room_semester where idSemester = :idSemester) and idUser = :idUser
    `;

    const result = await sequelizeConfig.instance.query(sql, {
      replacements: { idSemester: idSemester, idUser: idUser },
      type: QueryTypes.SELECT,
    });

    return result;
  }
}

module.exports = RegisService;
