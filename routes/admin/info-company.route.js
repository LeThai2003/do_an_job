const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/info-company.controller");
const multer  = require('multer')
const validate = require("../../validates/admin/info-company.validate");

const storageMulter = require("../../helpers/storage-multer.helper");
  
const upload = multer({ storage: storageMulter() })

router.get("/:congTyId", controller.index);

router.get("/:congTyId/edit", controller.edit);

router.post("/:congTyId/edit", upload.single('logo'), validate.editInfo, controller.editPost);


module.exports = router;