const { QueryTypes } = require("sequelize");
const sequelizeConfig = require("../../configs/sequelize.config");
const ResourceService = require("../resources/resource.service");
const ItemModel = require("./item.model");

class ItemService {
  static async CreateItem(itemName, quantity) {
    return await ItemModel.model.create({
      itemName: itemName,
      quantity: quantity,
    });
  }
  static async UpdateImage(idItem, byteArray) {
    const item = await ItemModel.model.findByPk(idItem);
    if (!item) {
      return null;
    }
    const idResourceOld = item.idResource;
    if (idResourceOld) {
      await ResourceService.RemoveResoruce(idResourceOld);
    }
    const newResource = await ResourceService.CreateRes(byteArray);
    if (!newResource?.id) {
      throw new Error("Tạo resource thất bại!");
    }
    item.idResource = newResource.id;
    return await item.save();
  }
  static async GetAll() {
    return await ItemModel.model.findAll();
  }
  static async GetDetailById(idItem) {
    return await ItemModel.model.findByPk(idItem);
  }
  static async AddQuantity(idItem, quantity) {
    const item = await ItemModel.model.findByPk(idItem);
    if (!item) {
      return null;
    }
    item.quantity += parseInt(quantity);
    return await item.save();
  }
  static async GetItemDetail(idItem) {
    const sql = `	  select itm.*, quantityLeft = ISNULL(itm.quantity - ritm.quantity, itm.quantity)
	  from (select * from item where id = :idItem) as itm
	  left join (select idItem, quantity=ISNULL(sum(quantity), 0 ) from room_item where idItem = :idItem group by idItem) as ritm
	  on itm.id = ritm.idItem
      `;
    const result = await sequelizeConfig.instance.query(sql, {
      replacements: { idItem: idItem },
      type: QueryTypes.SELECT,
    });
    if (!result) {
      return null;
    }
    return result[0];
  }
}

module.exports = ItemService;
