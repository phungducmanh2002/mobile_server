const UploadFileHelper = require("../../helpers/upload.file.helper");
const ResourceService = require("../resources/resource.service");
const RoomService = require("./room.service");
const express = require("express");

class RoomController {
  static GetAllRoom = [
    async (req, res, next) => {
      const rooms = await RoomService.GetAll();
      res.status(200).json(rooms);
    },
  ];
  static GetDetailsById = [
    /**Kiem tra room id */
    (req, res, next) => {
      const roomId = req.params?.roomId;
      if (!roomId) {
        res.status(400).json({ msg: "Vui lòng cung cấp id phòng" });
        return;
      }
      req.roomId = roomId;
      next();
    },
    /**GET DETAILS */
    async (req, res, next) => {
      const roomDetails = await RoomService.GeDetailstById(req.roomId);
      res.status(200).json(roomDetails);
    },
  ];
  static CreateRoom = [
    express.urlencoded({ extended: false }),
    express.json(),
    /**Check body */
    (req, res, next) => {
      const roomDto = req.body;
      if (!roomDto) {
        res.status(400).json({ msg: "Vui long cung cap day du thong tin!" });
        return;
      }
      req.roomDto = roomDto;
      next();
    },
    /**CREATE */
    async (req, res, next) => {
      const room = await RoomService.CreateRoom(req.roomDto);
      if (!room) {
        res.status(500).json({ msg: "Lỗi khi tạo!" });
        return;
      }
      res.status(200).json(room);
    },
  ];
  static GetImageIds = [
    /** */
    (req, res, next) => {
      const idRoom = req?.params?.idRoom;
      if (!idRoom) {
        res.status(400).json({ msg: "Vui lòng cung cấp đầy đủ thông tin!" });
        return;
      }
      req.idRoom = idRoom;
      next();
    },
    /** */
    async (req, res, next) => {
      const tmp = await RoomService.GetImageIds(req.idRoom);
      res.status(200).json(tmp);
    },
  ];
  static DeleteRoomImage = [
    /**Check */
    (req, res, next) => {
      const idRoom = req.params?.idRoom;
      const idResource = req.params?.idResource;

      if (!idRoom || !idResource) {
        res.status(400).json({ msg: "Vui lòng cung cấp đầy đủ thông tin!" });
        return;
      }

      req.idRoom = idRoom;
      req.idResource = idResource;
      next();
    },
    async (req, res, next) => {
      const isDelete = await RoomService.DeleteRoomImage(
        req.idRoom,
        req.idResource
      );

      res.status(200).json({ msg: "NOTHING" });
    },
  ];
  static AddRoomImage = [
    UploadFileHelper.UploadFile.single("image"),
    /**Kiểm tra user binding (auth)*/
    (req, res, next) => {
      const idRoom = req?.params?.idRoom;
      if (!idRoom) {
        res.status(403).json({ msg: "Vui lòng cung cấp id room!" });
        return;
      }
      req.idRoom = idRoom;
      next();
    },
    /**Kiểm tra file */
    (req, res, next) => {
      const byteArray = req?.file?.buffer;
      if (!byteArray) {
        res.status(400).json({ msg: "image not found!" });
        return;
      }
      req.fileBuffer = byteArray;
      next();
    },
    /**create image */
    async (req, res, next) => {
      const resouce = await ResourceService.CreateRes(req.fileBuffer);
      if (!resouce) {
        res.status(500).json({ msg: "Lỗi khi tạo hình ảnh!" });
        return;
      }
      const roomImage = await RoomService.AddRoomImage(req.idRoom, resouce.id);
      if (!roomImage) {
        await ResourceService.RemoveResoruce(resouce.id);
        res.status(500).json({ msg: "Cập nhật avatar thất bại" });
        return;
      }
      res.status(200).json({ idResource: resouce.id });
    },
  ];
}

module.exports = RoomController;
