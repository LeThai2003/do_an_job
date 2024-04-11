const generateHeper = require("../../helpers/generate.helper");
const UserModel = require("../../models/User.model");
const md5 = require("md5");

//[GET] /user/login
module.exports.login = async (req, res) => {

    res.render("client/pages/user/login");
}

//[POST] /user/login
module.exports.loginPost = async (req, res) => {

    console.log(req.body);

    const inforUser = {};

    inforUser.matKhau = md5(req.body.password);
    inforUser.token = generateHeper.generateRandomString(30);
    inforUser.ngaySinh = req.body.birthdate;
    inforUser.email = req.body["username-left"];
    inforUser.sdt = req.body.phone
    inforUser.gioiTinh = 1;
    if(req.body.gender == "nữ")
    {
        inforUser.gioiTinh = 0;
    }

    const hoTenArr = req.body.fullname.split(" ");
    inforUser.ten = hoTenArr[hoTenArr.length - 1];
    inforUser.ho = req.body.fullname.slice(0, req.body.fullname.length - inforUser.ten.length -1);

    await UserModel.insertUser(inforUser);

    res.redirect("/")
}

