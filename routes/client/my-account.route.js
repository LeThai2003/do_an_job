const express = require("express");
const router = express.Router();
const controller = require("../../controller/client/my-account.controller");
const validate = require("../../validates/client/my-account.validate")

const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniquePrefix + "-" + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })



router.get("/", controller.index);

router.post("/edit/info-user/:userId", validate.infoUser, controller.editPost);

router.post("/edit/avatar-user/:userId",upload.single('avatar'), controller.editAvatar);

router.post("/edit/info-company/:companyId", upload.single('logo'), controller.editCompanyInfo);

router.post("/create/company", upload.single('logo'), controller.createCompany);


module.exports = router;