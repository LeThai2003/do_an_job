const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/user.controller");
const validate = require("../../validates/client/user");

router.get("/login", controller.login);

router.post("/login", validate.register);

module.exports = router;