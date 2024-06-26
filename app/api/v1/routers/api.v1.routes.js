const express = require("express");
const UserRouter = require("./user/user.routes");
const ResRouter = require("./resource/resource.routes");
const SemesterRouter = require("./semester/semester.routes");
const RoomCollectionRouter = require("./roomCollection/room.collection.routes");
const RoomRouter = require("./room/room.routes");
const ItemRouter = require("./item/item.routes");
const RegisRouter = require("./regis/regis.routes");
const BillRouter = require("./bill/bill.routes");
const router = express.Router();

router.use("/user", UserRouter);
router.use("/res", ResRouter);
router.use("/semester", SemesterRouter);
router.use("/room-collection", RoomCollectionRouter);
router.use("/room", RoomRouter);
router.use("/item", ItemRouter);
router.use("/regis", RegisRouter);
router.use("/bill", BillRouter);

module.exports = router;
