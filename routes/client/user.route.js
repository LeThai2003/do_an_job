const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/user.controller");
const validate = require("../../validates/client/user");

router.get("/login", controller.login);

router.post("/register", validate.register, controller.registerPost);

router.post("/login", controller.loginPost);

router.get("/logout", controller.logout);

module.exports = router;