const generateHeper = require("../../helpers/generate.helper");
const UserModel = require("../../models/User.model");
const md5 = require("md5");

//[GET] /user/login
module.exports.login = async (req, res) => {

    res.render("client/pages/user/login");
}

//[POST] /user/register
module.exports.registerPost = async (req, res) => {

    console.log(req.body);

    const inforUser = {};

    inforUser.matKhau = md5(req.body.password);
    inforUser.token = generateHeper.generateRandomString(30);
    inforUser.ngaySinh = req.body.birthdate;
    inforUser.email = req.body["username-left"].trim();

    // check email trung
    const existUser = await UserModel.getUserByEmail(inforUser.email);

    if(existUser)
    {
        req.flash("error", "Email trùng, vui lòng nhập lại!");
        res.redirect("back");
        return;
    }

    inforUser.sdt = req.body.phone
    inforUser.gioiTinh = 1;
    if(req.body.gender == "nữ")
    {
        inforUser.gioiTinh = 0;
    }

    const hoTenArr = req.body.fullname.split(" ");
    inforUser.ten = hoTenArr[hoTenArr.length - 1].trim();
    inforUser.ho = req.body.fullname.slice(0, req.body.fullname.length - inforUser.ten.length -1).trim();

    //lưu thông tin user vào database
    await UserModel.insertUser(inforUser);

    res.cookie("tokenUser", inforUser.token);

    res.redirect("/")
}
//[POST] /user/login
module.exports.loginPost = async (req, res) => {

    const email = req.body["username_right"];
    const password = req.body.pw;

    const user = await UserModel.getUserByEmail(email)
    
    if(!user)
    {
        req.flash("error", "Email không chính xác!");
        res.redirect("back");
        return;
    }

    if(user.matKhau != md5(password))
    {
        req.flash("error", "Mật khẩu không chính xác!");
        res.redirect("back");
        return;
    }

    res.cookie("tokenUser", user.token);

    res.redirect("/")
}

//[GET]/user/logout
module.exports.logout = (req, res) => {
    res.clearCookie("tokenUser");
    res.redirect("/");
}

