const UserModel = require("../../models/User.model");
const CompanyModel = require("../../models/Company.model");
const slugHelper = require("../../helpers/convert-to-slug.helper");
const generateHelper = require("../../helpers/generate.helper");

const md5 = require("md5");

//[GET]/my-account
module.exports.index = async(req, res) => {
    try {
        const userId = res.locals.User.userId;

        const company = await CompanyModel.getInfoCompanyByIdUser(userId);

        // console.log(company);

        res.render("client/pages/my-account/index",{
            title: "Trang công ty",
            company: company
        })
    } catch (error) {
        console.log(error);
        res.redirect(`/user?view=login`);
    }
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
                const existEmailCty = await CompanyModel.getCompanyByEmail(inforUser.email);

                if(existUser)
                {
                    req.flash("error", "Email trùng, vui lòng nhập lại!");
                    res.redirect("back");
                    return;
                }
                else
                {
                    if(existEmailCty)
                    {
                        const userIdFromCty = existEmailCty.userId;
                        if(userIdFromCty != userId) // người này không là chủ sở hữu công ty 
                        {
                            req.flash("error", "Email trùng, vui lòng nhập lại!");
                            res.redirect("back");
                            return;
                        }
                    }
                }
            }

            inforUser.sdt = req.body.sdt

            const existSdt = await UserModel.getUserBySdt(inforUser.sdt);
            const existSdtCty = await CompanyModel.getCompanyBySdt(inforUser.sdt);
            

            if(inforUser.sdt != res.locals.User.sdt) 
            {
                if(existSdt) 
                {
                    req.flash("error", "Số điện thoại trùng, vui lòng nhập lại!");
                    res.redirect("back");
                    return;
                }
                else
                {
                    if(existSdtCty)
                    {
                        const userIdFromCty = existSdtCty.userId;
                        if(userIdFromCty != userId) // người này không là chủ sở hữu công ty 
                        {
                            req.flash("error", "Số điện thoại trùng, vui lòng nhập lại!");
                            res.redirect("back");
                            return;
                        } 
                    }
                }
            }
            
            
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
                inforUser.token = generateHelper.generateRandomString(30);
                query = `update NGUOIDUNG set ho=N'${inforUser.ho}', ten=N'${inforUser.ten}', email='${inforUser.email}', ngaySinh='${inforUser.ngaySinh}', sdt='${inforUser.sdt}', gioiTinh=${inforUser.gioiTinh}, matKhau=N'${inforUser.matKhau}', token='${inforUser.token}' where userId = ${userId}`
                await UserModel.updateUser(query);
                res.cookie("tokenUser", inforUser.token);
            }
            else
            {
                query = `update NGUOIDUNG set ho=N'${inforUser.ho}', ten=N'${inforUser.ten}', email='${inforUser.email}', ngaySinh='${inforUser.ngaySinh}', sdt='${inforUser.sdt}', gioiTinh=${inforUser.gioiTinh} where userId = ${userId}`
                await UserModel.updateUser(query);
            }
        }
        
        res.redirect("back");
    } catch (error) {
        console.log("update thông tin user + err: ", error);
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
        const userId = res.locals.User.userId;
        const sdt = res.locals.User.sdt;


        const companyId = req.params.companyId;
        // console.log(companyId);

        const company = await CompanyModel.getCompanyById(companyId);
        console.log(company);

        const oldEmail = company.emailCT;
        const oldTenCT = company.tenCT;

        const slug = slugHelper.convertToSlug(req.body.tenCT);
        req.body.slug = slug;   

        req.body.quyMo = parseInt(req.body.quyMo);

        const infoCompany = req.body;

        console.log(oldTenCT)
        console.log(req.body.tenCT)

        if(oldTenCT != req.body.tenCT)
        {
            const existTenCT = await CompanyModel.getCompanyByTenCT(req.body.tenCT);

            console.log(existTenCT);

            if(existTenCT)
            {
                req.flash("error", "Tên công ty trùng, vui lòng nhập lại!");
                res.redirect("back");
                return;
            }
        }

        if(oldEmail != infoCompany.emailCT)
        {
            const existCompany = await CompanyModel.getCompanyByEmail(infoCompany.emailCT);
            const existEmailUser = await UserModel.getUserByEmail(infoCompany.emailCT);

            if(existCompany)
            {
                req.flash("error", "Email trùng, vui lòng nhập lại!");
                res.redirect("back");
                return;
            }
            else
            {
                if(existEmailUser)
                {
                    const userIdFromCty = existCompany.userId;
                    if(userId != userIdFromCty)
                    {
                        req.flash("error", "Email trùng, vui lòng nhập lại!");
                        res.redirect("back");
                        return;
                    }
                }
            }
        }

        const oldSdt = company.sdtCT;
        const existSdt = await CompanyModel.getCompanyBySdt(req.body.sdtCT);
        const existSdtUser = await UserModel.getUserBySdt(sdt);

        if(oldSdt != req.body.sdtCT)
        {
            if(existSdt) 
            {
                req.flash("error", "Số điện thoại trùng, vui lòng nhập lại!");
                res.redirect("back");
                return;
            }
            else
            {
                if(existSdtUser)
                {
                    const userIdFromCty = existSdt.userId;
                    if(userIdFromCty != userId) // người này không là chủ sở hữu công ty 
                    {
                        req.flash("error", "Số điện thoại trùng, vui lòng nhập lại!");
                        res.redirect("back");
                        return;
                    } 
                }
            }
        }

        if(req.file && req.file.filename)
        {
            infoCompany.logo = `/uploads/${req.file.filename}`;
        }
        
        await CompanyModel.updateInfoCompanyClient(infoCompany, companyId);

        res.redirect("back");
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}

//[POST]/my-account/create/company
module.exports.createCompany = async (req, res) => {

    try {
        console.log(req.body)

        // console.log(req.file)
        req.body.quyMo = parseInt(req.body.quyMo);

        const userId = res.locals.User.userId;
        const sdt = res.locals.User.sdt;

        const slug = slugHelper.convertToSlug(req.body.tenCT);
        req.body.slug = slug;

        const infoCompany = req.body;


        const existTenCT = await CompanyModel.getCompanyByTenCT(req.body.tenCT);
        if(existTenCT)
        {
            req.flash("error", "Tên công ty trùng, vui lòng nhập lại!");
            res.redirect("back");
            return;
        }
        // const existEmailUser = await UserModel.getUserByEmail(infoCompany.emailCT);


        const existCompany = await CompanyModel.getCompanyByEmail(infoCompany.emailCT);
        const existEmailUser = await UserModel.getUserByEmail(infoCompany.emailCT);

        if(existCompany)
        {
            req.flash("error", "Email trùng, vui lòng nhập lại!");
            res.redirect("back");
            return;
        }
        else
        {
            if(existEmailUser)
            {
                const userIdFromCty = existCompany.userId;
                if(userId != userIdFromCty)
                {
                    req.flash("error", "Email trùng, vui lòng nhập lại!");
                    res.redirect("back");
                    return;
                }
            }
        }

        const existSdt = await CompanyModel.getCompanyBySdt(req.body.sdtCT);
        const existSdtUser = await UserModel.getUserBySdt(sdt);

        if(existSdt) 
        {
            req.flash("error", "Số điện thoại trùng, vui lòng nhập lại!");
            res.redirect("back");
            return;
        }
        else
        {
            if(existSdtUser)
            {
                const userIdFromCty = existSdt.userId;
                if(userIdFromCty != userId) // người này không là chủ sở hữu công ty 
                {
                    req.flash("error", "Số điện thoại trùng, vui lòng nhập lại!");
                    res.redirect("back");
                    return;
                } 
            }
        }

        if(req.file && req.file.filename)
        {
            infoCompany.logo = `/uploads/${req.file.filename}`;
        }

        await CompanyModel.insertCompany(userId, infoCompany);
        res.redirect("back");
    } catch (error) {
        console.log(error);
        res.redirect("/");
    }
}