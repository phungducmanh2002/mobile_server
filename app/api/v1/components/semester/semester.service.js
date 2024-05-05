const { where, Op, QueryTypes } = require("sequelize");
const SemesterModel = require("./semester.model");
const RoomModel = require("../room/room.model");
const RoomSemesterModel = require("../roomSemester/room.semester.model");
const sequelizeConfig = require("../../configs/sequelize.config");

class SemesterService {
  static async CreateSemester(semesterDto) {
    return await SemesterModel.model.create(semesterDto);
  }
  static async FindByName(semesterName) {
    return await SemesterModel.model.findOne({
      where: {
        semesterName: semesterName,
      },
    });
  }
  static async GetAll() {
    return await SemesterModel.model.findAll();
  }
  static async GetById(semesterId) {
    return await SemesterModel.model.findByPk(semesterId, {
      include: {
        model: RoomModel.model,
        as: "rooms",
        require: false,
      },
    });
  }
  static async GetAllRoomAddedBySemester(semesterId) {
    const semesterDetail = await SemesterModel.model.findByPk(semesterId, {
      include: {
        model: RoomModel.model,
        as: "rooms",
        require: false,
      },
    });
    return semesterDetail?.rooms;
  }
  static async GetAllRoomNotAddedBySemester(semesterId) {
    const roomSemester = await RoomSemesterModel.model.findAll({
      where: { idSemester: semesterId },
    });
    /**Chưa add room nào */
    if (roomSemester.length == 0) {
      return await RoomModel.model.findAll();
    }
    const roomIdAdded = roomSemester.map((element) => {
      return element.idRoom;
    });

    return await RoomModel.model.findAll({
      where: {
        id: {
          [Op.notIn]: roomIdAdded,
        },
      },
    });
  }
  static async SemesterAddRoom(idSemester, idRoom) {
    try {
      return await RoomSemesterModel.model.create({
        idSemester: idSemester,
        idRoom: idRoom,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  static async SemesterRemoveRoom(idSemester, idRoom) {
    const registeds = await SemesterService.GetRoomSemesterRegisted(
      idSemester,
      idRoom
    );
    if (registeds.length > 0) {
      return null;
    }

    try {
      const semesterRoom = await RoomSemesterModel.model.findOne({
        where: {
          idSemester: idSemester,
          idRoom: idRoom,
        },
      });
      if (semesterRoom) {
        return await semesterRoom.destroy();
      }
    } catch (err) {}
    return null;
  }
  static async GetAllRoomAdded(idSemester) {
    const sql = `
    
    select * from
    (
      select idRoom, slotUse = count(regis.id)
      from regis 
      right join
      (select * from room_semester where idSemester = :idSemester) as rsmt
      on regis.idRoomSemester = rsmt.id
      group by idRoom
    ) as rtt
    inner join room
    on rtt.idRoom = room.id

    `;
    const result = await sequelizeConfig.instance.query(sql, {
      replacements: { idSemester: idSemester },
      type: QueryTypes.SELECT,
    });

    return result;
  }
  static async GetAllRoomNotAdded(idSemester) {
    const sql = `
    select * from room where id not in (select idRoom from room_semester where idSemester = :idSemester)
    `;
    const result = await sequelizeConfig.instance.query(sql, {
      replacements: { idSemester: idSemester },
      type: QueryTypes.SELECT,
    });

    return result;
  }
  static async GetSemesterOpen() {
    const sql = `
      select *
      from (select top 1 * from semester order by createdAt DESC) as smt
      where DATEADD(DAY,10,startAt) > GETDATE()
      `;
    const result = await sequelizeConfig.instance.query(sql, {
      type: QueryTypes.SELECT,
    });

    return result;
  }
  static async GetRoomSemesterRegisted(idSemester, idRoom) {
    const sql = `
    select * from regis where idRoomSemester in (select id from room_semester where idRoom = :idRoom and idSemester = :idSemester)
    `;

    const result = await sequelizeConfig.instance.query(sql, {
      replacements: { idSemester: idSemester, idRoom: idRoom },
      type: QueryTypes.SELECT,
    });

    return result;
  }
  static async GetRoomNameInSemester(idSemester) {
    const sql = `
          select idRoomSemester=rsmt.id , roomName = room.roomName from room
          inner join
          (select * from room_semester where idSemester = :idSemester) as rsmt on rsmt.idRoom = room.id
        `;
    const result = await sequelizeConfig.instance.query(sql, {
      replacements: { idSemester: idSemester },
      type: QueryTypes.SELECT,
    });

    return result;
  }
}

module.exports = SemesterService;
