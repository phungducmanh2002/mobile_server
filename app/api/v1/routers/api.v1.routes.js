const express = require("express");
const UserRouter = require("./user/user.routes");
const ResRouter = require("./resource/resource.routes");
const SemesterRouter = require("./semester/semester.routes");
const RoomCollectionRouter = require("./roomCollection/room.collection.routes");
const RoomRouter = require("./room/room.routes");
const router = express.Router();

router.use("/user", UserRouter);
router.use("/res", ResRouter);
router.use("/semester", SemesterRouter);
router.use("/room-collection", RoomCollectionRouter);
router.use("/room", RoomRouter);

module.exports = router;
