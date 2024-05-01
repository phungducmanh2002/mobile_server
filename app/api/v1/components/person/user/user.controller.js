const express = require("express");
const {
  SIGNUP_MISSING_EMAIL_PASSWORD,
  SIGNUP_EMAIL_EXISTS,
  SIGNUP_FAILED_CREATE_USER,
  NOT_ROLE,
} = require("../../../constances/response.message");
const UserValidation = require("./user.validation");
const UserService = require("./user.service");
const UserDto = require("../../../models/model.user.dto");
const MapperHelper = require("../../../helpers/mapper.helper");
const ServerFileLogger = require("../../../configs/log4js.config");
const GmailService = require("../../gmail/gmail.service");
const NumberStringHelper = require("../../../helpers/number.string.helper");
const UploadFileHelper = require("../../../helpers/upload.file.helper");
const ResourceService = require("../../resources/resource.service");

class UserController {
  static Signup = [
    express.urlencoded({ extended: false }),
    express.json(),
    /**Kiểm tra thông tin đăng kí */
    (req, res, next) => {
      const userDto = req.body;
      if (!userDto?.email || !userDto?.password) {
        res.status(400).json({ msg: SIGNUP_MISSING_EMAIL_PASSWORD });
        return;
      }
      req.userDto = userDto;
      next();
    },
    /**Kiểm tra email đã tồn tại hay chưa */
    async (req, res, next) => {
      const email = req.userDto.email;
      const user = await UserService.FindUserByEmail(email);
      if (user) {
        res.status(400).json({ msg: SIGNUP_EMAIL_EXISTS });
        return;
      }
      next();
    },
    /**Tạo user */
    async (req, res, next) => {
      const user = await UserService.CreateUser(req.userDto);
      if (!user) {
        res.status(500).json({ msg: SIGNUP_FAILED_CREATE_USER });
        return;
      }
      const userDto = UserDto.Mapper(user).hiddenPrivateInfo();
      res.status(200).json(userDto);
      ServerFileLogger.SignupLogger.warn(userDto);
    },
  ];
  static SendActivationCode = [
    /**Check user id */
    (req, res, next) => {
      const userId = req?.params?.userId;
      if (!userId) {
        res.status(400).json({ msg: "Vui lòng cung cấp user id!" });
        return;
      }
      req.userId = userId;
      next();
    },
    /**Check trạng thái tài khoản */
    async (req, res, next) => {
      const user = await UserService.GetUserById(req.userId);
      if (user.accountStatus != 0) {
        res.status(400).json({ msg: "Tài khoản đã được kích hoạt!" });
        return;
      }
      req.user = user;
      next();
    },
    /**Generate activation code */
    async (req, res, next) => {
      const obj = await UserService.GenerateActivationCode2(req.user);
      if (!obj) {
        res.status(500).json({ msg: "Lỗi sinh mã kích hoạt tài khoản!" });
        return;
      }
      const gmailRsl = GmailService.SendActivationCode(obj.email, obj.code);
      if (!gmailRsl) {
        res.status(500).json({ msg: "Lỗi gửi email!" });
        return;
      }
      res.status(200).json({
        msg: `Mã kích hoạt đã được gửi tới email của bạn: ${obj.email}`,
      });
    },
  ];
  static ActiveAccount = [
    express.urlencoded({ extended: false }),
    express.json(),
    /**Kiểm tra code and user id */
    (req, res, next) => {
      const userCode = req.body;
      if (!userCode) {
        res.status(400).json({ msg: "Vui lòng cung cấp đầy đủ thông tin!" });
        return;
      }
      req.userCode = userCode;
      next();
    },
    /**Check trạng thái tài khoản */
    async (req, res, next) => {
      const userId = req.userCode.userId;
      const activeCode = req.userCode.activeCode;

      if (!userId || !activeCode) {
        res.status(400).json({ msg: "Vui lòng cung cấp đầy đủ thông tin!" });
        return;
      }

      const user = await UserService.GetUserById(userId);

      if (!user) {
        res.status(400).json({ msg: "User không tồn tại!" });
        return;
      }

      if (user.accountStatus != 0) {
        res.status(400).json({ msg: "Tài khoản đã được kích hoạt!" });
        return;
      }
      req.user = user;
      req.activeCode = activeCode;
      next();
    },
    /**Active account */
    async (req, res, next) => {
      const isActive = await UserService.ActiveAccount(
        req.user,
        req.activeCode
      );

      if (!isActive) {
        res.status(400).json({ msg: "Mã kích hoạt không đúng!" });
        return;
      }
      res.status(200).json({ msg: "Tài khoản của bạn đã được kích hoạt!" });
    },
  ];
  static EditUser = [
    express.urlencoded({ extended: false }),
    express.json(),
    /**Kiểm tra bind user và req body */
    (req, res, next) => {
      const userDtoNew = req.body;
      if (!userDtoNew) {
        res.status(400).json({ msg: "Vui lòng cung cấp đầy đủ thông tin!" });
        return;
      }
      if (!req.user) {
        res.status(403).json({ msg: NOT_ROLE });
        return;
      }
      req.userDtoNew = userDtoNew;
      next();
    },
    /**Cập nhật thông tin user */
    async (req, res, next) => {
      const userNew = await UserService.UpdateUser(req.user, req.userDtoNew);
      if (!userNew) {
        res.status(500).json({ msg: "Lỗi khi cập nhật thông tin!" });
        return;
      }
      res.status(200).json(UserDto.Mapper(userNew).hiddenPrivateInfo());
    },
  ];
  static Login = [
    express.urlencoded({ extended: false }),
    express.json(),
    /**Kiểm tra email pasword */
    (req, res, next) => {
      const account = req.body;
      if (!account) {
        res.status(400).json({ msg: "Vui lòng cung cấp email và mật khẩu!" });
        return;
      }
      req.account = account;
      next();
    },
    /**Tìm user trong db */
    async (req, res, next) => {
      const email = req.account.email;
      const user = await UserService.FindUserByEmail(email);
      if (!user) {
        res.status(400).json({ msg: "Tài khoản không tồn tại!" });
        return;
      }
      req.user = user;
      next();
    },
    /**So sánh mật khẩu */
    (req, res, next) => {
      const password = req.account.password;
      const user = req.user;
      const isSamePassword = NumberStringHelper.CompareStringAndHash(
        password,
        user.password
      );
      if (!isSamePassword) {
        res.status(400).json({ msg: "Mật khẩu không đúng!" });
        return;
      }
      next();
    },
    /**Sinh token */
    (req, res, next) => {
      const user = req.user;
      const token = UserService.GenerateUserToken(user.id);
      if (!token) {
        res.status(500).json({ message: "Lỗi khi sinh token!" });
        return;
      }
      res.status(200).json({ token: token });
    },
  ];
  static GetMe = [
    /** */
    (req, res, next) => {
      if (!req.user) {
        res.status(400).json({ msg: "Vui lòng cung cấp đầy đủ thông tin!" });
        return;
      }
      res.status(200).json(UserDto.Mapper(req.user).hiddenPrivateInfo());
    },
  ];
  static UpdateAvatar = [
    UploadFileHelper.UploadFile.single("image"),
    /**Kiểm tra user binding (auth)*/
    (req, res, next) => {
      if (!req.user) {
        res.status(403).json({ msg: "Vui lòng đăng nhập!" });
        return;
      }
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
      const userUpdate = await UserService.UpdateAvatar(req.user, resouce.id);
      if (!userUpdate) {
        await ResourceService.RemoveResoruce(resouce.id);
        res.status(500).json({ msg: "Cập nhật avatar thất bại" });
        return;
      }
      res.status(200).json({ idResource: resouce.id });
    },
  ];
}

module.exports = UserController;
