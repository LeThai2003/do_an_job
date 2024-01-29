const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/job.controller");

router.get("/", controller.index);

// router.get("/:area", controller.searchForm);



module.exports = router;