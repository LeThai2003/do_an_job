const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/job.controller");

router.get("/", controller.getAllJobs);

module.exports = router;