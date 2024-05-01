const RoomCollectionService = require("./room.collection.service");
const express = require("express");

class RoomCollectionController {
  static CreateRoomCollection = [
    express.urlencoded({ extended: false }),
    express.json(),
    /**Kiểm tra tên */
    (req, res, next) => {
      const roomCollectionName = req.body?.roomCollectionName;
      if (!roomCollectionName) {
        res.status(400).json({ msg: "Vui lòng cung cấp tên dãy!" });
        return;
      }
      req.roomCollectionName = roomCollectionName;
      next();
    },
    /**Save */
    async (req, res, next) => {
      const roomCollection = await RoomCollectionService.CreateRoomCollection(
        req.roomCollectionName
      );
      if (!roomCollection) {
        res.status(500).json({ msg: "Không thể tạo dãy!" });
        return;
      }
      res.status(200).json(roomCollection);
    },
  ];
  static GetAll = [
    /** */
    async (req, res, next) => {
      const roomCOllectionList = await RoomCollectionService.GetAll();
      res.status(200).json(roomCOllectionList);
    },
  ];
  static GetById = [
    /**Kiểm tra id */
    (req, res, next) => {
      const roomCollectionId = req?.params?.roomCollectionId;
      if (!roomCollectionId) {
        res.status(400).json({ msg: "Vui lòng cung cấp room collection id" });
        return;
      }
      req.roomCollectionId = roomCollectionId;
      next();
    },
    /** */
    async (req, res, next) => {
      const roomCollectionDetails = await RoomCollectionService.GetDetailsById(
        req.roomCollectionId
      );
      if (!roomCollectionDetails) {
        res.status(500).json({ msg: "Lỗi truy vấn" });
        return;
      }
      res.status(200).json(roomCollectionDetails);
    },
  ];
}
module.exports = RoomCollectionController;
