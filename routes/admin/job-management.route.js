const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/job-management.controller");

const validate = require("../../validates/admin/job-management.validate");

router.get("/:congTyId", controller.index);

router.get("/:congTyId/create", controller.create);

router.post("/:congTyId/create", validate.createNewJob, controller.createPost);

router.get("/:congTyId/detail/:slugCV", controller.detail);

router.get("/:congTyId/edit/:slugCV", controller.edit);

module.exports = router;