const SemesterModel = require("../../api/v1/components/semester/semester.model");

class TestSemester {
  static GenTable() {
    SemesterModel.model.sync({ force: true });
  }
  static CreateDataErrStartAtGtEndAt() {
    const startDate = new Date();

    const endDate = new Date();

    const semesterData = {
      semesterName: "HK2-2024",
      startAt: startDate,
      endAt: endDate,
    };
    SemesterModel.model
      .create(semesterData)
      .then((rsl) => {
        console.log("CREATE SUCCESS");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static CreateDataErrTimeRangeGoiDauNhau() {
    const semesterData1 = {
      semesterName: "HK2-2024",
      startAt: "2024-01-18",
      endAt: "2024-11-18",
    };

    const semesterData2 = {
      semesterName: "HK1-20252",
      startAt: "2024-11-17",
      endAt: "2025-01-18",
    };

    SemesterModel.model
      .create(semesterData1)
      .then((rsl) => {
        console.log("CREATE SUCCESS 1");
        SemesterModel.model
          .create(semesterData2)
          .then((rsl) => {
            console.log("CREATE SUCCESS 2");
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static CreateDataOke() {
    const startDate = new Date();

    const endDate = new Date();
    endDate.setMonth(11);

    const semesterData = {
      semesterName: "HK3-2024",
      startAt: startDate,
      endAt: endDate,
    };
    SemesterModel.model
      .create(semesterData)
      .then((rsl) => {
        console.log("CREATE SUCCESS");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = TestSemester;
