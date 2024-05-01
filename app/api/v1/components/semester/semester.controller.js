const SemesterService = require("./semester.service");
const express = require("express");

class SemesterController {
  static CreateSemester = [
    express.urlencoded({ extended: false }),
    express.json(),
    /**Check req */
    (req, res, next) => {
      const semesterDto = req.body;
      if (
        !semesterDto ||
        !semesterDto?.startAt ||
        !semesterDto?.endAt ||
        !semesterDto?.semesterName
      ) {
        res.status(400).json({ msg: "Vui lòng cung cấp đầy đủ thông tin!" });
        return;
      }
      semesterDto.startAt = new Date(semesterDto.startAt);
      semesterDto.endAt = new Date(semesterDto.endAt);
      req.semesterDto = semesterDto;
      next();
    },
    /**Kiem tra semester name */
    async (req, res, next) => {
      const semesterNameInDB = await SemesterService.FindByName(
        req.semesterDto.semesterName
      );

      if (semesterNameInDB) {
        res.status(400).json({ msg: "Semester name đã tồn tại!" });
        return;
      }
      next();
    },
    /**Create */
    async (req, res, next) => {
      try {
        const newSemester = await SemesterService.CreateSemester(
          req.semesterDto
        );
        if (!newSemester) {
          res.status(500).json({ msg: "Lỗi khi tạo semester" });
          return;
        }
        res.status(200).json(newSemester);
      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    },
  ];
  static GetAllSemester = [
    /** */
    async (req, res, next) => {
      const semesterList = await SemesterService.GetAll();
      res.status(200).json(semesterList);
    },
  ];
  static GetById = [
    /**kiem tra req */
    (req, res, next) => {
      const semesterId = req.params?.semesterId;
      if (!semesterId) {
        res.status(400).json({ msg: "Vui lòng cung cấp đầy đủ thông tin!" });
        return;
      }
      req.semesterId = semesterId;
      next();
    },
    /**GET */
    async (req, res, next) => {
      const semester = await SemesterService.GetById(req.semesterId);
      res.status(200).json(semester);
    },
  ];
  static GetAllRoomAdded = [
    /**kiem tra req */
    (req, res, next) => {
      const semesterId = req.params?.semesterId;
      if (!semesterId) {
        res.status(400).json({ msg: "Vui lòng cung cấp đầy đủ thông tin!" });
        return;
      }
      req.semesterId = semesterId;
      next();
    },
    /** */
    async (req, res, next) => {
      let rooms = await SemesterService.GetAllRoomAddedBySemester(
        req.semesterId
      );
      if (!rooms) {
        rooms = [];
      }
      res.status(200).json(rooms);
    },
  ];
  static GetAllRoomNotAdded = [
    /**kiem tra req */
    (req, res, next) => {
      const semesterId = req.params?.semesterId;
      if (!semesterId) {
        res.status(400).json({ msg: "Vui lòng cung cấp đầy đủ thông tin!" });
        return;
      }
      req.semesterId = semesterId;
      next();
    },
    /** */
    async (req, res, next) => {
      let rooms = await SemesterService.GetAllRoomNotAddedBySemester(
        req.semesterId
      );
      res.status(200).json(rooms);
    },
  ];
  static SemesterAddRoom = [
    express.urlencoded({ extended: false }),
    express.json(),
    /**Check body */
    (req, res, next) => {
      const idSemester = req.body?.idSemester;
      const idRoom = req.body?.idRoom;
      if (!idSemester || !idRoom) {
        res.status(400).json({ msg: "Cung cấp đủ thông tin nha chế!" });
        return;
      }
      req.idSemester = idSemester;
      req.idRoom = idRoom;
      next();
    },
    /**Create */
    async (req, res, next) => {
      const semesterRoom = await SemesterService.SemesterAddRoom(
        req.idSemester,
        req.idRoom
      );

      if (!semesterRoom) {
        res.status(500).json({ msg: "Lỗi khi tạo" });
        return;
      }
      res.status(200).json(semesterRoom);
    },
  ];
  static SemesterRemoveRoom = [
    /**Check body */
    (req, res, next) => {
      const idSemester = req.params?.idSemester;
      const idRoom = req.params?.idRoom;
      if (!idSemester || !idRoom) {
        res.status(400).json({ msg: "Cung cấp đủ thông tin nha chế!" });
        return;
      }
      req.idSemester = idSemester;
      req.idRoom = idRoom;
      next();
    },
    /**Create */
    async (req, res, next) => {
      const semesterRoom = await SemesterService.SemesterRemoveRoom(
        req.idSemester,
        req.idRoom
      );

      if (!semesterRoom) {
        res.status(500).json({ msg: "Lỗi khi xóa" });
        return;
      }
      res.status(200).json(semesterRoom);
    },
  ];
}

module.exports = SemesterController;
