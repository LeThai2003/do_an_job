const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/cv-management.controller");

router.get("/:congTyId", controller.index);

module.exports = router;