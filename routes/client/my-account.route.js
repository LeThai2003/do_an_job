const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/my-account.controller");


router.get("/", controller.index);

router.post("/edit/:userId", controller.editPost);


module.exports = router;