const BillService = require("../../api/v1/components/bill/bill.service");

class TestBill {
  static GetBill(idBill) {
    return BillService.GetBillById(idBill);
  }
  static GetRegisBill(idRegis) {
    return BillService.GetSemesterByRegis(idRegis);
  }
  static GetElectricBill(idElectricWater) {
    return BillService.GetSemesterByElectricWater(idElectricWater);
  }
}

module.exports = TestBill;
