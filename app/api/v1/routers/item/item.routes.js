const express = require("express");
const ItemController = require("../../components/item/item.controller");
const router = express.Router();

ItemController;
router.get("/", ItemController.GetAll);
router.get("/:idItem", ItemController.GetById);
router.put("/add/:idItem/:quantity", ItemController.AddQuantity);
router.post("/create", ItemController.CreateItem);
router.post("/update-image/:idItem", ItemController.UpdateImage);

module.exports = router;
