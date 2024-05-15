const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/cv-management.controller");
const authMiddleware = require("../../middleware/admin/auth.middleware");

router.get("/:congTyId", authMiddleware.requireAuthManage, controller.index);

router.get("/:congTyId/detail/:maCTCV", authMiddleware.requireAuthManage, controller.detailCV);

module.exports = router;