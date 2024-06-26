const express = require("express");
const BillController = require("../../components/bill/bill.controller");
const router = express.Router();

router.post("/create-electric-water", BillController.CreateElectricWaterBill);
router.put("/pay/:idBill", BillController.PayBill);
router.get("/my-bill/:idUser", BillController.GetMyBill);
router.get("/chart-room-bill", BillController.GetAllRoomBillInTimeRange);
router.get(
  "/chart-electric-water-bill",
  BillController.GetAllElectricWaterBillInTimeRange
);
router.get(
  "/get-all-by-semester/:idSemester",
  BillController.GetAllBillBySemester
);
router.get(
  "/room-bill-by-semester/:idSemester",
  BillController.GetAllRoomBillBySemester
);
router.get(
  "/electric-water-bill-by-semester/:idSemester",
  BillController.GetAllElectricWaterBillBySemester
);
router.get(
  "/my-bill-by-semester/:idSemester/:idUser",
  BillController.GetAllBillBySemesterAndUser
);
router.get("/:idBill", BillController.GetBillById);

module.exports = router;
