const express = require("express");
const UserController = require("../..//components/person/user/user.controller");
const MiddleWare = require("../../middlewares/middleware.auth");
const router = express.Router();

router.post("/signup", UserController.Signup);
router.post("/login", UserController.Login);
router.post("/avatar", MiddleWare.BindUser(), UserController.UpdateAvatar);

router.put("/edit", MiddleWare.BindUser(), UserController.EditUser);
router.put("/active", UserController.ActiveAccount);
router.put("/active2", UserController.ActiveAccount2);
router.get("/send-activation-code/:userId", UserController.SendActivationCode);
router.get("/send-activation-code2/:email", UserController.SendActivationCode2);
router.get("/my-info", MiddleWare.BindUser(), UserController.GetMe);

module.exports = router;
