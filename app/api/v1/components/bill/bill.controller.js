const express = require("express");
const BillService = require("./bill.service");

class BillController {
  static CreateElectricWaterBill = [
    express.urlencoded({ extended: false }),
    express.json(),
    (req, res, next) => {
      const idRoomSemester = req.body?.idRoomSemester;
      const electricNumber = req.body?.electricNumber;
      const waterNumber = req.body?.waterNumber;
      const month = req.body?.month;
      const year = req.body?.year;

      if (
        !idRoomSemester ||
        !electricNumber ||
        !waterNumber ||
        !month ||
        !year
      ) {
        res.status(400).json({ msg: "In valid data" });
        return;
      }

      req.idRoomSemester = idRoomSemester;
      req.electricNumber = electricNumber;
      req.waterNumber = waterNumber;
      req.month = month;
      req.year = year;

      next();
    },

    /**Cerate*/
    async (req, res, next) => {
      const newBill = await BillService.CreateElectricWaterBill(
        req.idRoomSemester,
        req.electricNumber,
        req.waterNumber,
        req.month,
        req.year
      );

      if (!newBill) {
        res.status(500).json({ msg: "SERVER ERROR" });
        return;
      }
      res.status(200).json(newBill);
    },
  ];
  static GetMyBill = [
    /** */
    (req, res, next) => {
      const idUser = req.params?.idUser;

      if (!idUser) {
        res.status(400).json({ msg: "Invalid request" });
        return;
      }

      req.idUser = idUser;
      next();
    },
    /** */
    async (req, res, next) => {
      const billList = await BillService.GetAllUserBills(req.idUser);
      if (!billList) {
        res.status(500).json({ msg: "SERVER ERROR" });
        return;
      }
      res.status(200).json(billList);
    },
  ];
  static GetBillById = [
    (req, res, next) => {
      const idBill = req.params?.idBill;

      if (!idBill) {
        res.status(400).json({ msg: "Request not valid" });
        return;
      }

      req.idBill = idBill;
      next();
    },
    async (req, res, next) => {
      const bill = await BillService.GetBillDetailById(req.idBill);
      if (!bill) {
        res.status(500).json({ msg: "SERVER ERROR" });
        return;
      }
      res.status(200).json(bill);
    },
  ];
  static GetAllBillBySemester = [
    (req, res, next) => {
      const idSemester = req.params?.idSemester;
      if (!idSemester) {
        res.status(400).json({ msg: "Invalid request" });
        return;
      }
      req.idSemester = idSemester;
      next();
    },
    async (req, res, next) => {
      const bills = await BillService.GetAllBillBySemester(req.idSemester);
      res.status(200).json(bills);
    },
  ];
  static GetAllRoomBillBySemester = [
    (req, res, next) => {
      const idSemester = req.params?.idSemester;
      if (!idSemester) {
        res.status(400).json({ msg: "Invalid request" });
        return;
      }
      req.idSemester = idSemester;
      next();
    },
    async (req, res, next) => {
      const bills = await BillService.GetAllRoomBillBySemester(req.idSemester);
      res.status(200).json(bills);
    },
  ];
  static GetAllElectricWaterBillBySemester = [
    (req, res, next) => {
      const idSemester = req.params?.idSemester;
      if (!idSemester) {
        res.status(400).json({ msg: "Invalid request" });
        return;
      }
      req.idSemester = idSemester;
      next();
    },
    async (req, res, next) => {
      const bills = await BillService.GetAllElectricWaterBillBySemester(
        req.idSemester
      );
      res.status(200).json(bills);
    },
  ];
  static PayBill = [
    (req, res, next) => {
      const idBill = req.params?.idBill;
      if (!idBill) {
        res.status(400).json({ msg: "Invalid request" });
        return;
      }
      req.idBill = idBill;
      next();
    },
    async (req, res, next) => {
      const billPayed = await BillService.PayBill(req.idBill);
      if (!billPayed) {
        res.status(500).json({ msg: "SERVER ERROR" });
        return;
      }
      res.status(200).json(billPayed);
    },
  ];
  static GetAllBillBySemesterAndUser = [
    (req, res, next) => {
      const idSemester = req.params?.idSemester;
      const idUser = req.params?.idUser;
      if (!idSemester || !idUser) {
        res.status(400).json({ msg: "Invalid request" });
        return;
      }
      req.idSemester = idSemester;
      req.idUser = idUser;
      next();
    },
    async (req, res, next) => {
      const bills = await BillService.GetAllRoomBIllBySemesterAndUser(
        req.idSemester,
        req.idUser
      );
      res.status(200).json(bills);
    },
  ];
}

module.exports = BillController;
