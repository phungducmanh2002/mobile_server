const SemesterController = require("../../components/semester/semester.controller");
const express = require("express");

const router = express.Router();

router.get("/", SemesterController.GetAllSemester);
router.get("/:semesterId", SemesterController.GetById);
router.get("/all-room-added/:semesterId", SemesterController.GetAllRoomAdded);
router.get(
  "/all-room-not-added/:semesterId",
  SemesterController.GetAllRoomNotAdded
);

router.post("/create", SemesterController.CreateSemester);
router.post("/add-room", SemesterController.SemesterAddRoom);
router.delete(
  "/remove-room/:idSemester/:idRoom",
  SemesterController.SemesterRemoveRoom
);

module.exports = router;
