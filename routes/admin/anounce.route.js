const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/announce.controller");

router.post("/:congTyId", controller.index);

module.exports = router;