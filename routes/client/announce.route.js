const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/announce.controller");

router.get("/:maCV/:userId", controller.index);

module.exports = router;