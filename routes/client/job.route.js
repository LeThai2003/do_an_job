const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/job.controller");

const multer  = require('multer')

const storageMulter = require("../../helpers/storage-multer.helper");
  
const upload = multer({ storage: storageMulter() })


router.get("/", controller.getAllJobs);

router.get("/detail/:slug", controller.detail);

module.exports = router;