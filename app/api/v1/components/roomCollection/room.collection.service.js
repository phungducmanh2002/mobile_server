const RoomModel = require("../room/room.model");
const RoomCollectionModel = require("./room.collection.model");

class RoomCollectionService {
  static async CreateRoomCollection(roomCollectionName) {
    try {
      return await RoomCollectionModel.model.create({
        roomCollectionName: roomCollectionName,
      });
    } catch (err) {
      return null;
    }
  }
  static async GetAll() {
    return await RoomCollectionModel.model.findAll();
  }
  static async GetDetailsById(roomCollectionId) {
    return await RoomCollectionModel.model.findByPk(roomCollectionId, {
      include: {
        model: RoomModel.model,
        as: "rooms",
      },
    });
  }
}

module.exports = RoomCollectionService;
