const UploadFileHelper = require("../../helpers/upload.file.helper");
const ItemService = require("./item.service");
const express = require("express");

class ItemController {
  static CreateItem = [
    express.urlencoded({ extended: false }),
    express.json(),
    /**Check */
    (req, res, next) => {
      const itemDto = req?.body;
      if (!itemDto?.itemName) {
        res.status(400).json({ msg: "Invalid data" });
        return;
      }
      req.itemDto = itemDto;
      next();
    },
    /** */
    async (req, res, next) => {
      const itemName = req.itemDto.itemName;
      const quantity = req.itemDto.quantity || 0;
      const newItem = await ItemService.CreateItem(itemName, quantity);
      if (!newItem) {
        res.status(500).json({ msg: "Error when create item" });
        return;
      }
      res.status(200).json(newItem);
    },
  ];
  static UpdateImage = [
    UploadFileHelper.UploadFile.single("image"),
    /**Check */
    (req, res, next) => {
      const idItem = req.params?.idItem;
      if (!idItem) {
        res.status(400).json({ msg: "VUi long cung cap id item" });
        return;
      }
      const byteArray = req?.file?.buffer;
      if (!byteArray) {
        res.status(400).json({ msg: "Data not found!" });
        return;
      }
      req.idItem = idItem;
      req.fileBuffer = byteArray;
      next();
    },
    /** */
    async (req, res, next) => {
      const itemUpdated = await ItemService.UpdateImage(
        req.idItem,
        req.fileBuffer
      );
      if (!itemUpdated) {
        res.status(500).json({ msg: "ERROR" });
        return;
      }
      res.status(200).json(itemUpdated);
    },
  ];
  static GetAll = [
    async (req, res, next) => {
      res.status(200).json(await ItemService.GetAll());
    },
  ];
  static GetById = [
    /**Check */
    (req, res, next) => {
      const idItem = req.params?.idItem;
      if (!idItem) {
        res.status(400).json({ msg: "Invalid data" });
        return;
      }
      req.idItem = idItem;
      next();
    },
    /** */
    async (req, res, next) => {
      const item = await ItemService.GetDetailById(req.idItem);
      if (!item) {
        res.status(500).json({ msg: "ERROR" });
        return;
      }
      res.status(200).json(item);
    },
  ];
  static AddQuantity = [
    /**Check */
    (req, res, next) => {
      const idItem = req.params?.idItem;
      const quantity = req.params?.quantity;

      if (!idItem) {
        res.status(400).json({ msg: "Invalid data" });
        return;
      }
      req.idItem = idItem;
      req.quantity = quantity;
      next();
    },
    /** */
    async (req, res, next) => {
      const item = await ItemService.AddQuantity(req.idItem, req.quantity);
      if (!item) {
        res.status(500).json({ msg: "ERROR" });
        return;
      }
      res.status(200).json(item);
    },
  ];
}

module.exports = ItemController;
