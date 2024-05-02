const UserModel = require("../../models/User.model");
const CompanyModel = require("../../models/Company.model");

const md5 = require("md5");

//[GET]/my-account
module.exports.index = async(req, res) => {
    const userId = res.locals.User.userId;

    const company = await CompanyModel.getInfoCompanyByIdUser(userId);

    // console.log(company);

    res.render("client/pages/my-account/index",{
        title: "Trang công ty",
        company: company
    })
}

//[POST]/my-account/edit/info-user/:userId
module.exports.editPost = async (req, res) => {
    try {
        const userId = req.params.userId;

        // console.log(req.body);

        if(req.body)
        {
            let query = ``;

            const inforUser = {};

            inforUser.ngaySinh = req.body.ngaySinh;

            inforUser.email = req.body.email.trim();

            if(req.body.email != res.locals.User.email)  // Nếu email nhập lại khác
            {
                const existUser = await UserModel.getUserByEmail(inforUser.email);

                if(existUser)
                {
                    req.flash("error", "Email trùng, vui lòng nhập lại!");
                    res.redirect("back");
                    return;
                }
            }

            inforUser.sdt = req.body.sdt

            inforUser.gioiTinh = 1;
            if(req.body.gioiTinh == "Nữ")
            {
                inforUser.gioiTinh = 0;
            }

            const fullName = req.body.name
            const fullNameArr = fullName.split(" ");
            inforUser.ten = fullNameArr[fullNameArr.length - 1].trim();
            inforUser.ho = fullName.slice(0, fullName.length - inforUser.ten.length -1).trim();


            if(req.body.matKhau != "")
            {
                inforUser.matKhau = md5(req.body.matKhau);
                query = `update NGUOIDUNG set ho=N'${inforUser.ho}', ten=N'${inforUser.ten}', email='${inforUser.email}', ngaySinh='${inforUser.ngaySinh}', sdt='${inforUser.sdt}', gioiTinh=${inforUser.gioiTinh}, matKhau=N'${inforUser.matKhau}' where userId = ${userId}`
            }
            else
            {
                query = `update NGUOIDUNG set ho=N'${inforUser.ho}', ten=N'${inforUser.ten}', email='${inforUser.email}', ngaySinh='${inforUser.ngaySinh}', sdt='${inforUser.sdt}', gioiTinh=${inforUser.gioiTinh} where userId = ${userId}`
            }

            await UserModel.updateUser(query);
        }

                

        res.redirect("back");
    } catch (error) {
        res.redirect("/");
    }
}

//[POST]/my-account/edit/avatar-user/:userId
module.exports.editAvatar = async (req, res) => {
    try {
        const userId = req.params.userId;

        let avatar = "";

        // console.log(req.file);

        if(req.file && req.file.filename)
        {
            avatar = `/uploads/${req.file.filename}`;
            await UserModel.updateAvatarUser(userId, avatar);
        }

        res.redirect("back");
        // res.send("ok");
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}

//[POST]/my-account/edit/info-company/:companyId
module.exports.editCompanyInfo = async (req, res) => {

    try {
        const companyId = req.params.companyId;

        let query = ``;

        const infoCompany = req.body;

        if(req.file && req.file.filename)
        {
            infoCompany.logo = `/uploads/${req.file.filename}`;
            query = `update CONGTY set tenCT = N'${infoCompany.tenCT}', diaDiem = N'${infoCompany.diaDiem}', sdtCT = '${infoCompany.sdtCT}', emailCT = '${infoCompany.emailCT}', quyMo = ${infoCompany.quyMo}, moTa = N'${infoCompany.moTa}', logo = N'${infoCompany.logo}' where congTyId = ${companyId}`;
        }
        else{
            query = `update CONGTY set tenCT = N'${infoCompany.tenCT}', diaDiem = N'${infoCompany.diaDiem}', sdtCT = '${infoCompany.sdtCT}', emailCT = '${infoCompany.emailCT}', quyMo = ${infoCompany.quyMo}, moTa = N'${infoCompany.moTa}' where congTyId = ${companyId}`;
        }

        await CompanyModel.updateInfoCompany(query);

        res.redirect("back");
    } catch (error) {
        res.redirect("/");
    }
}

//[POST]/my-account/create/company
module.exports.createCompany = async (req, res) => {

    try {
        // console.log(req.body)

        // console.log(req.file)

        const userId = res.locals.User.userId;

        const infoCompany = req.body;

        if(req.file && req.file.filename)
        {
            infoCompany.logo = `/uploads/${req.file.filename}`;
        }

        await CompanyModel.insertCompany(userId, infoCompany);
        res.redirect("back");
    } catch (error) {
        res.redirect("/");
    }
}