const { where, Op, QueryTypes } = require("sequelize");
const ResourceModel = require("../resources/resource.model");
const RoomCollectionModel = require("../roomCollection/room.collection.model");
const RoomResourceModel = require("../roomResource/room.resource.model");
const SemesterModel = require("../semester/semester.model");
const RoomModel = require("./room.model");
const ItemModel = require("../item/item.model");
const RoomItemModel = require("../roomItem/room.item.model");
const sequelizeConfig = require("../../configs/sequelize.config");
const ItemService = require("../item/item.service");

class RoomService {
  static async CreateRoom(roomDto) {
    try {
      return await RoomModel.model.create(roomDto);
    } catch (error) {
      return null;
    }
  }
  static async GetAll() {
    return await RoomModel.model.findAll({
      include: {
        model: RoomCollectionModel.model,
        attributes: ["roomCollectionName"],
      },
    });
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
  static async GetItemAdded(idRoom) {
    const query = `select itemdetail.*, quantityInRoom = ISNULL( ritm.quantity, 0)
    from
    (select itm.*, quantityLeft = ISNULL(itm.quantity - itmq.number,0)
        from
        (select * from item where id in (select idItem from room_item where idRoom = :idRoom)) as itm
        left join
        (select idItem, number= ISNULL(sum(quantity), 0) from room_item group by idItem) as itmq
        on itm.id = itmq.idItem) as itemdetail
    
    inner join
    (select * from room_item where idRoom = :idRoom) as ritm
    on itemdetail.id = ritm.idItem
    `;

    const result = await sequelizeConfig.instance.query(query, {
      replacements: { idRoom: idRoom },
      type: QueryTypes.SELECT,
    });

    return result;

    // const room = await RoomModel.model.findByPk(idRoom, {
    //   include: {
    //     model: ItemModel.model,
    //     through: RoomItemModel.model,
    //   },
    // });

    // const result = room?.items.map((elm) => {
    //   return {
    //     id: elm.id,
    //     idResource: elm.idResource,
    //     itemName: elm.itemName,
    //     quantity: elm.quantity,
    //     quantityInRoom: elm.room_item.quantity,
    //   };
    // });

    // return result;
  }
  static async GetItemNotAdded(idRoom) {
    const sql = `
    select itm.*, quantityLeft = ISNULL((itm.quantity - itmq.number), itm.quantity)
    from
    (select item.*
    from item
    where id not in (select idItem from room_item where idRoom = :idRoom))as itm
    left join
    (select idItem, number= ISNULL(sum(quantity), 0) from room_item group by idItem) as itmq
    on itm.id = itmq.idItem
    `;
    const result = await sequelizeConfig.instance.query(sql, {
      replacements: { idRoom: idRoom },
      type: QueryTypes.SELECT,
    });

    return result;
  }
  static async AddRoomItem(idRoom, idItem, quantity) {
    try {
      const item = await ItemService.GetItemDetail(idItem);

      let quantityLeft = item?.quantityLeft;

      if (quantityLeft != 0 && !quantityLeft) {
        return null;
      }

      quantityLeft = parseInt(quantityLeft);

      if (quantityLeft <= 0) {
        return null;
      }

      if (quantity > quantityLeft) {
        quantity = quantityLeft;
      }

      let roomItem = await RoomItemModel.model.findOne({
        where: {
          idRoom: idRoom,
          idItem: idItem,
        },
      });

      if (!roomItem) {
        roomItem = await RoomItemModel.model.create({
          idRoom: idRoom,
          idItem: idItem,
          quantity: 0,
        });
      }

      let newQuantity = roomItem.quantity + quantity;

      if (newQuantity < 0) {
        newQuantity = 0;
      }

      roomItem.quantity = newQuantity;

      return await roomItem.save();
    } catch (error) {
      return null;
    }
  }
  static async DeleteRoomItem(idRoom, idItem) {
    return await RoomItemModel.model.destroy({
      where: {
        idRoom: idRoom,
        idItem: idItem,
      },
    });
  }
}

module.exports = RoomService;
