const { where } = require("sequelize");
const ResourceModel = require("../resources/resource.model");
const RoomCollectionModel = require("../roomCollection/room.collection.model");
const RoomResourceModel = require("../roomResource/room.resource.model");
const SemesterModel = require("../semester/semester.model");
const RoomModel = require("./room.model");

class RoomService {
  static async CreateRoom(roomDto) {
    try {
      return await RoomModel.model.create(roomDto);
    } catch (error) {
      return null;
    }
  }
  static async GetAll() {
    return await RoomModel.model.findAll();
  }
  static async GeDetailstById(roomId) {
    return await RoomModel.model.findByPk(roomId, {
      include: [
        {
          model: RoomCollectionModel.model,
        },
        {
          model: ResourceModel.model,
          attributes: ["id"],
          through: { attributes: [] },
        },
      ],
    });
  }
  static async GetImageIds(idRoom) {
    const roomImages = await RoomResourceModel.model.findAll({
      where: {
        idRoom: idRoom,
      },
    });
    return roomImages.map((elm) => {
      return elm.idResource;
    });
  }
  static async DeleteRoomImage(idRoom, idResource) {
    const roomRes = await RoomResourceModel.model.findOne({
      where: {
        idRoom: idRoom,
        idResource: idResource,
      },
    });

    if (!roomRes) {
      return false;
    }

    await roomRes.destroy();

    await ResourceModel.model.destroy({
      where: {
        id: idResource,
      },
    });

    return true;
  }
  static async AddRoomImage(idRoom, idResource) {
    try {
      return await RoomResourceModel.model.create({
        idRoom: idRoom,
        idResource: idResource,
      });
    } catch (error) {
      return null;
    }
  }
}

module.exports = RoomService;
