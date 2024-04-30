const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/my-account.controller");


router.get("/", controller.index);


module.exports = router;