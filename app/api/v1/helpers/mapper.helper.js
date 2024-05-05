class MapperHelper {
  static AssignAttr(src, dst) {
    for (const [key, value] of Object.entries(src)) {
      dst[key] = value;
    }
    return dst;
  }

  static CreateBillRegisDto(bill, semester) {
    if (semester == null || bill?.idRegis == null) {
      return null;
    }
    const billDto = {};
    billDto.id = bill.id;
    billDto.title = bill.title;
    billDto.status = bill.status;
    billDto.roomPrice = semester.roomPrice;

    return billDto;
  }

  static CreateBillElectricWaterDto(bill, semester, electricWater) {
    if (semester == null || bill?.idElectricWater == null) {
      return null;
    }

    const billDto = {};
    billDto.id = bill.id;
    billDto.title = bill.title;
    billDto.status = bill.status;
    billDto.electricPrice = semester.electricPrice;
    billDto.waterPrice = semester.waterPrice;
    billDto.electricNumber = electricWater.electricNumber;
    billDto.waterNumber = electricWater.waterNumber;
    billDto.month = electricWater.month;
    billDto.year = electricWater.year;
    return billDto;
  }
}

module.exports = MapperHelper;
