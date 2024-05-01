const RoomCollectionController = require("../../components/roomCollection/room.collection.controller");
const express = require("express");

const router = express.Router();

router.get("/", RoomCollectionController.GetAll);
router.get("/:roomCollectionId", RoomCollectionController.GetById);
router.post("/create", RoomCollectionController.CreateRoomCollection);

module.exports = router;
