const express = require("express");
const RoomController = require("../../components/room/room.controller");
const router = express.Router();

router.get("/", RoomController.GetAllRoom);
router.get("/:roomId", RoomController.GetDetailsById);
router.get("/images/:idRoom", RoomController.GetImageIds);
router.post("/create", RoomController.CreateRoom);
router.post("/add-image/:idRoom", RoomController.AddRoomImage);
router.delete("/image/:idRoom/:idResource", RoomController.DeleteRoomImage);
module.exports = router;
