const ResourceModel = require("./resource.model");

class ResourceService {
  static async CreateRes(byteArray) {
    return await ResourceModel.model.create({ data: byteArray });
  }
  static async GetRes(resourceId) {
    return await ResourceModel.model.findByPk(resourceId);
  }
  static async RemoveResoruce(resourceId) {
    return await ResourceModel.model.destroy({
      where: {
        id: resourceId,
      },
    });
  }
}

module.exports = ResourceService;
