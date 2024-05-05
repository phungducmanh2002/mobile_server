const RegisService = require("../../api/v1/components/regis/regis.service");

class TestRegis {
  static async CreateRegis() {
    RegisService.CreateRegis(1, 1, 1);
  }
}

module.exports = TestRegis;
