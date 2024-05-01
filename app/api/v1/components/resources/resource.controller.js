const UploadFileHelper = require("../../helpers/upload.file.helper");
const ResourceService = require("./resource.service");

class ResourceController {
  static CreateResource = [
    UploadFileHelper.UploadFile.single("file"),
    /**Check image data */
    (req, res, next) => {
      const byteArray = req?.file?.buffer;
      if (!byteArray) {
        res.status(400).json({ msg: "Data not found!" });
        return;
      }
      console.log(req.file);
      req.fileBuffer = byteArray;
      next();
    },
    /**create image */
    async (req, res, next) => {
      const resouce = await ResourceService.CreateRes(req.fileBuffer);
      if (!resouce) {
        res.status(500).json({ msg: "Lỗi khi lưu hình ảnh!" });
        return;
      }
      res.status(200).json({ idResource: resouce.id });
    },
  ];
  static GetResource = [
    /**Check req data */
    (req, res, next) => {
      const resourceId = req?.params?.resourceId;
      if (!resourceId) {
        res.status(400).json({ msg: "Vui lòng cung cấp id resource" });
        return;
      }
      req.resourceId = resourceId;
      next();
    },
    /** Get resource */
    async (req, res, next) => {
      const resourceObject = await ResourceService.GetRes(req.resourceId);
      if (!resourceObject) {
        res.status(500).json({ msg: "Lỗi lấy hình ảnh!" });
        return;
      }
      res.header("Content-Type", "image/png");
      res.send(resourceObject.data);
      res.end();
    },
  ];
  static GetByteRes = [
    /**Check req data */
    (req, res, next) => {
      const resourceId = req?.params?.resourceId;
      if (!resourceId) {
        res.status(400).json({ msg: "Vui lòng cung cấp id resource" });
        return;
      }
      req.resourceId = resourceId;
      next();
    },
    /** Get resource */
    async (req, res, next) => {
      const resourceObject = await ResourceService.GetRes(req.resourceId);
      if (!resourceObject) {
        res.status(500).json({ msg: "Lỗi lấy hình ảnh!" });
        return;
      }
      res.send({ data: resourceObject.data });
      res.end();
    },
  ];
}

module.exports = ResourceController;
