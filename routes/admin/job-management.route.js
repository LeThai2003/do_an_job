const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/job-management.controller");

router.get("/:congTyId", controller.index);

router.get("/:congTyId/create", controller.create);


module.exports = router;