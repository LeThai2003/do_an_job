const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/job-management.controller");

const validate = require("../../validates/admin/job-management.validate");

router.get("/:congTyId", controller.index);

router.get("/:congTyId/create", controller.create);

router.post("/:congTyId/create", validate.createNewJob, controller.createPost);

router.get("/:congTyId/detail/:slugCV", controller.detail);

router.get("/:congTyId/edit/:slugCV", controller.edit);

router.post("/:congTyId/edit/:maCV", validate.createNewJob, controller.postEdit);

router.patch("/:congTyId/:changeStatus/:maCV", controller.changStatus);

module.exports = router;