const sequelizeConfig = require("../../configs/sequelize.config");
const BillModel = require("../bill/bill.model");
const RoomSemesterModel = require("../roomSemester/room.semester.model");
const ElectricWaterModel = require("./electric.water.month.model");

class ElectricWaterService {
  static async GetElectricWaterById(idElectricWater) {
    return await ElectricWaterModel.model.findByPk(idElectricWater);
  }
}

module.exports = ElectricWaterService;
