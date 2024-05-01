const express = require("express");
const ResourceController = require("../../components/resources/resource.controller");
const router = express.Router();

router.post("/create", ResourceController.CreateResource);
router.get("/:resourceId", ResourceController.GetResource);
router.get("/bytes/:resourceId", ResourceController.GetByteRes);

module.exports = router;
