const { Op } = require("sequelize");
const TestSemester = require("./model/semester");
const SemesterModel = require("../api/v1/components/semester/semester.model");
const TestRegis = require("./model/roomSemester");
const TestBill = require("./model/bill");
// console.log("SEMESTER TEST");

// TestSemester.GenTable();
// TestSemester.CreateDataErr();
// TestSemester.CreateDataOke();
// TestSemester.CreateDataErrTimeRangeGoiDauNhau();

// const startAt = "2024-01-01";

// const date1 = new Date();
// const date2 = new Date();
// const date3 = new Date();

// SemesterModel.model
//   .findOne({
//     where: {
//       [Op.or]: {
//         startAt: { [Op.between]: ["2024-01-22", "2024-01-23"] },
//         endAt: { [Op.between]: ["2025-01-18", "2025-01-20"] },
//       },
//     },
//   })
//   .then((result) => {
//     console.log(result);
//   });

// date2.setDate(date1.getDate() + 100);
// date3.setDate(date1.getDate() + 50);

// const c = (date3[Op.between] = [date1, date2]);

// console.log(c);

// TestRegis.CreateRegis();

// TestBill.GetRegisBill(36).then((rsl) => {
//   if (!rsl) {
//     console.log("DUME");
//   }
//   console.log(rsl);
// });

// TestBill.GetElectricBill(12).then((rsl) => {
//   if (!rsl) {
//     console.log("DUME");
//   }
//   console.log(rsl);
// });

TestBill.GetBill(2).then((bill) => {
  console.log(bill);
});
