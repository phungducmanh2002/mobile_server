const { where, Op } = require("sequelize");
const SemesterModel = require("./semester.model");
const RoomModel = require("../room/room.model");
const RoomSemesterModel = require("../roomSemester/room.semester.model");

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
    const semesterRoom = await RoomSemesterModel.model.findOne({
      where: {
        idSemester: idSemester,
        idRoom: idRoom,
      },
    });
    if (semesterRoom) {
      return await semesterRoom.destroy();
    }
    return null;
  }
}

module.exports = SemesterService;
