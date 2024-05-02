const express = require("express");
const RoomController = require("../../components/room/room.controller");
const router = express.Router();

router.get("/", RoomController.GetAllRoom);
router.get("/:roomId", RoomController.GetDetailsById);
router.get("/images/:idRoom", RoomController.GetImageIds);
router.get("/item-added/:idRoom", RoomController.GetAllItemAdded);
router.get("/item-not-added/:idRoom", RoomController.GetAllItemNotAdded);
router.put("/add-item/:idRoom/:idItem/:quantity", RoomController.AddItem);
router.post("/create", RoomController.CreateRoom);
router.post("/add-image/:idRoom", RoomController.AddRoomImage);
router.delete("/image/:idRoom/:idResource", RoomController.DeleteRoomImage);
router.delete("/item/:idRoom/:idItem", RoomController.DeleteRoomItem);
module.exports = router;
