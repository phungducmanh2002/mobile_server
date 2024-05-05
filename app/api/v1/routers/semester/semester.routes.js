const SemesterController = require("../../components/semester/semester.controller");
const express = require("express");

const router = express.Router();

router.get("/", SemesterController.GetAllSemester);
router.get("/semester-open", SemesterController.GetSemesterOpen);
router.get("/:semesterId", SemesterController.GetById);
router.get("/all-room-added/:semesterId", SemesterController.GetAllRoomAdded);
router.get(
  "/all-room-not-added/:semesterId",
  SemesterController.GetAllRoomNotAdded
);
router.get("/room-names/:idSemester", SemesterController.GetRoomNameInSemester);

router.post("/create", SemesterController.CreateSemester);
router.post("/add-room", SemesterController.SemesterAddRoom);
router.delete(
  "/remove-room/:idSemester/:idRoom",
  SemesterController.SemesterRemoveRoom
);

router.post(
  "/registation-room/:idSemester",
  SemesterController.RegistationRoom
);

module.exports = router;
