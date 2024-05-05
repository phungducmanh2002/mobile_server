const express = require("express");
const RegisService = require("./regis.service");

class RegisController {
  static CreateRegis = [
    express.urlencoded({ extended: false }),
    express.json(),
    (req, res, next) => {
      const idUser = req.body?.idUser;
      const idSemester = req.body?.idSemester;
      const idRoom = req.body?.idRoom;

      if (!idUser || !idSemester || !idRoom) {
        res.status(400).json({ msg: "In valid data" });
        return;
      }

      req.idUser = idUser;
      req.idSemester = idSemester;
      req.idRoom = idRoom;

      next();
    },
    /** */
    async (req, res, next) => {
      const newRegis = await RegisService.CreateRegis(
        req.idUser,
        req.idSemester,
        req.idRoom
      );

      if (!newRegis) {
        res.status(500).json({ msg: "SERVER ERROR" });
        return;
      }
      res.status(200).json(newRegis);
    },
  ];
}

module.exports = RegisController;
