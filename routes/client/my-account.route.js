const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/my-account.controller");
const validate = require("../../validates/client/my-account.validate")


router.get("/", controller.index);

router.post("/edit/:userId", validate.infoUser, controller.editPost);


module.exports = router;