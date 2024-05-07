const { QueryTypes } = require("sequelize");
const sequelizeConfig = require("../../configs/sequelize.config");
const BillModel = require("./bill.model");
const ElectricWaterService = require("../electricWaterInMonth/electric.water.month.service");
const MapperHelper = require("../../helpers/mapper.helper");
const RoomSemesterModel = require("../roomSemester/room.semester.model");
const ElectricWaterModel = require("../electricWaterInMonth/electric.water.month.model");

class BillService {
  static async GetBillById(idBill) {
    const bill = await BillModel.model.findByPk(idBill);
    if (!bill) {
      return null;
    }
    if (bill.idElectricWater) {
      const semester = await BillService.GetSemesterByElectricWater(
        bill.idElectricWater
      );
      const electricWater = await ElectricWaterService.GetElectricWaterById(
        bill.idElectricWater
      );

      if (!semester?.[0] || !electricWater) {
        return null;
      }

      return MapperHelper.CreateBillElectricWaterDto(
        bill,
        semester[0],
        electricWater
      );
    } else if (bill.idRegis) {
      const semester = await BillService.GetSemesterByRegis(bill.idRegis);
      if (!semester?.[0]) {
        return null;
      }
      return MapperHelper.CreateBillRegisDto(bill, semester[0]);
    }
    return null;
  }
  static async GetBillRegis(idRegis) {}
  static async GetBillElectricWater(idElectricWater) {}
  static async GetSemesterByRegis(idRegis) {
    const sql = `
    select * from semester where id 
      in (select idSemester from room_semester where id
        in (select idRoomSemester from regis where id  = :idRegis
          )
        )
    `;

    const result = await sequelizeConfig.instance.query(sql, {
      replacements: { idRegis: idRegis },
      type: QueryTypes.SELECT,
    });

    return result;
  }
  static async GetSemesterByElectricWater(idElectricWater) {
    const sql = `
    select * from semester where id 
    in (select idSemester from room_semester where id
      in (select idRoomSemester from electricWater where id = :idElectricWater
        )
      )
    `;

    const result = await sequelizeConfig.instance.query(sql, {
      replacements: { idElectricWater: idElectricWater },
      type: QueryTypes.SELECT,
    });

    return result;
  }
  static async GetAllUserBills(idUser) {
    const sql = `
      select * from bill where idRegis in (select id from regis where idUser = :idUser )
    `;

    const result = await sequelizeConfig.instance.query(sql, {
      replacements: {
        idUser: idUser,
      },
      type: QueryTypes.SELECT,
    });

    return result;
  }
  static async GetAllRoomBills(idRoom) {}
  static async CreateElectricWaterBill(
    idRoomSemester,
    electricNumber,
    waterNumber,
    month,
    year
  ) {
    const roomSemester = await RoomSemesterModel.model.findByPk(idRoomSemester);
    if (!roomSemester) {
      return null;
    }

    const sqlGetRoom = `
          select *
          from room
          where id
          in (select idRoom from room_semester where id = :idRoomSemester)
    `;

    const room = await sequelizeConfig.instance.query(sqlGetRoom, {
      replacements: { idRoomSemester: idRoomSemester },
      type: QueryTypes.SELECT,
    });

    if (room.length == 0) {
      return null;
    }

    const transaction = await sequelizeConfig.instance.transaction();

    try {
      const electricWater = await ElectricWaterModel.model.create(
        {
          idRoomSemester: idRoomSemester,
          electricNumber: electricNumber,
          waterNumber: waterNumber,
          month: month,
          year: year,
        },
        {
          transaction: transaction,
        }
      );

      const bill = await BillModel.model.create(
        {
          idElectricWater: electricWater.id,
          title: `Tiền điện nước phòng ${room?.[0]?.roomName} tháng ${month}/${year}`,
          status: false,
        },
        {
          transaction: transaction,
        }
      );

      await transaction.commit();

      return bill;
    } catch (error) {
      await transaction.rollback();
      return null;
    }
  }
  static async GetAllBillBySemester(idSemester) {
    const bills = [];
    const roomBills = await this.GetAllRoomBillBySemester(idSemester);
    const electricWaterBills = await this.GetAllElectricWaterBillBySemester(
      idSemester
    );
    bills.push(...roomBills, ...electricWaterBills);
    return bills;
  }
  static async GetAllRoomBillBySemester(idSemester) {
    const sql = `
    select bill.*, [user].email, room.roomName
    from bill 
    inner join regis
    on bill.idRegis = regis.id
    inner join [user]
    on regis.idUser = [user].id
    inner join (select * from room_semester where idSemester = :idSemester) as rsmt
    on regis.idRoomSemester = rsmt.id
    inner join room
    on rsmt.idRoom = room.id
    `;

    const bills = await sequelizeConfig.instance.query(sql, {
      replacements: {
        idSemester: idSemester,
      },
      type: QueryTypes.SELECT,
    });

    return bills;
  }
  static async GetAllElectricWaterBillBySemester(idSemester) {
    // const sql = `
    // select *
    // from bill
    // where idElectricWater
    // in (select id from electricWater where idRoomSemester
    // in (select  id from room_semester where idSemester = :idSemester))
    // `;

    const sql = `
    select bill.*, room.roomName, electricWater.[month], electricWater.[year]
    from bill
    inner join electricWater
    on bill.idElectricWater = electricWater.id
    inner join (select * from room_semester where idSemester = :idSemester) as rsmt
    on electricWater.idRoomSemester = rsmt.id
    inner join room
    on rsmt.idRoom = room.id
    `;

    const bills = await sequelizeConfig.instance.query(sql, {
      replacements: {
        idSemester: idSemester,
      },
      type: QueryTypes.SELECT,
    });

    return bills;
  }
  static async GetAllRoomBill(isPay) {
    return await BillModel.model.findAll();
  }
  static async GetAllElectricWaterBill(isPay) {
    return await BillModel.model.findAll();
  }
  static async GetBillDetailById(idBill) {
    const bill = await BillModel.model.findByPk(idBill);
    if (!bill) {
      return null;
    }
    if (bill.idRegis != null) {
      return BillService.GetRoomBillDetailById(idBill);
    } else {
      return BillService.GetElectricWaterBillDetailById(idBill);
    }
  }
  static async GetRoomBillDetailById(idBill) {
    const sql = `
    select bill.*, semester.roomPrice, room.roomName
    from (select * from bill where id = :idBill) as bill
    inner join regis
    on bill.idRegis = regis.id
    inner join room_semester
    on regis.idRoomSemester = room_semester.id
    inner join semester
    on room_semester.idSemester = semester.id
    inner join room
    on room_semester.idRoom = room.id

    `;

    const result = await sequelizeConfig.instance.query(sql, {
      replacements: {
        idBill: idBill,
      },
      type: QueryTypes.SELECT,
    });

    return result?.[0];
  }
  static async GetElectricWaterBillDetailById(idBill) {
    const sql = `
    select bill.*, 
		electricWater.electricNumber, electricWater.waterNumber,electricWater.[month], electricWater.[year],
		semester.electricPrice, semester.waterPrice
    from (select * from bill where id = :idBill) as bill
    inner join electricWater
    on bill.idElectricWater = electricWater.id
    inner join room_semester
    on electricWater.idRoomSemester = room_semester.id
    inner join semester
    on room_semester.idSemester = semester.id
    `;

    const result = await sequelizeConfig.instance.query(sql, {
      replacements: {
        idBill: idBill,
      },
      type: QueryTypes.SELECT,
    });

    return result?.[0];
  }
  static async PayBill(idBill) {
    const bill = await BillModel.model.findByPk(idBill);
    bill.status = true;
    return await bill.save();
  }
  static async GetAllRoomBIllBySemesterAndUser(idSemester, idUser) {
    const sql = `
    select bill.*, [user].email, room.roomName
    from bill 
    inner join (select * from regis where idUser = :idUser) as regis
    on bill.idRegis = regis.id
    inner join [user]
    on regis.idUser = [user].id
    inner join (select * from room_semester where idSemester = :idSemester) as rsmt
    on regis.idRoomSemester = rsmt.id
    inner join room
    on rsmt.idRoom = room.id
    `;

    const bills = await sequelizeConfig.instance.query(sql, {
      replacements: {
        idSemester: idSemester,
        idUser: idUser,
      },
      type: QueryTypes.SELECT,
    });

    return bills;
  }
  static async GetAllRoomBillByTimeRange(fromTime, toTime) {
    const sql = `
    select bill.*, semester.roomPrice, room.roomName
    from (select * from bill where createdAt between :fromTime and :toTime ) as bill
    inner join regis
    on bill.idRegis = regis.id
    inner join room_semester
    on regis.idRoomSemester = room_semester.id
    inner join semester
    on room_semester.idSemester = semester.id
    inner join room
    on room_semester.idRoom = room.id
    `;

    const bills = await sequelizeConfig.instance.query(sql, {
      replacements: {
        fromTime: fromTime,
        toTime: toTime,
      },
      type: QueryTypes.SELECT,
    });

    return bills;
  }
  static async GetAllElectricWaterBillByTimeRange(fromTime, toTime) {
    const sql = `
    select bill.*, semester.electricPrice, semester.waterPrice, electricWater.electricNumber, electricWater.waterNumber, room.roomName
    from (select * from bill where createdAt between :fromTime and :toTime) as bill
    inner join electricWater
    on bill.idElectricWater = electricWater.id
    inner join room_semester
    on electricWater.idRoomSemester = room_semester.id
    inner join semester
    on room_semester.idSemester = semester.id
    inner join room
    on room_semester.idRoom = room.id
    `;

    const bills = await sequelizeConfig.instance.query(sql, {
      replacements: {
        fromTime: fromTime,
        toTime: toTime,
      },
      type: QueryTypes.SELECT,
    });

    return bills;
  }
}

module.exports = BillService;
