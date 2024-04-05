const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/job.controller");

router.get("/", controller.getAllJobs);

router.get("/detail/:slug", controller.detail);

module.exports = router;