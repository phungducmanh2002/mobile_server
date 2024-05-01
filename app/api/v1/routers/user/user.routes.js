const express = require("express");
const UserController = require("../..//components/person/user/user.controller");
const MiddleWare = require("../../middlewares/middleware.auth");
const router = express.Router();

router.post("/signup", UserController.Signup);
router.post("/login", UserController.Login);
router.post("/avatar", MiddleWare.BindUser(), UserController.UpdateAvatar);

router.put("/edit", MiddleWare.BindUser(), UserController.EditUser);
router.put("/active", UserController.ActiveAccount);
router.get("/send-activation-code/:userId", UserController.SendActivationCode);
router.get("/my-info", MiddleWare.BindUser(), UserController.GetMe);

module.exports = router;
