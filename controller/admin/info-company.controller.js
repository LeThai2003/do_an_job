const CompanyModel = require("../../models/Company.model");
const UserModel = require("../../models/User.model");
const slugHelper = require("../../helpers/convert-to-slug.helper");
const he = require('he');

//[GET] //manage/infoCompany/:congTyId
module.exports.index = async(req, res) => {

    const congTyId = req.params.congTyId;
    const company = await CompanyModel.getCompanyById(congTyId);

    console.log(company)

    res.render("admin/pages/infoCompany/index", {
        title: "Trang thông tin công ty",
        company
    })
}

//[GET] //manage/infoCompany/:congTyId/edit
module.exports.edit = async(req, res) => {

    const congTyId = req.params.congTyId;
    const company = await CompanyModel.getCompanyById(congTyId);

    res.render("admin/pages/infoCompany/edit", {
        title: "Trang chỉnh sửa thông tin công ty",
        company
    })
}

//[POST] //manage/infoCompany/:congTyId/edit
module.exports.editPost = async(req, res) => {
    try {
        const congTyId = req.params.congTyId;

        const sdt = res.locals.User.sdt;
        const userId = res.locals.User.userId;

        const company = await CompanyModel.getCompanyById(congTyId);
        const oldEmail = company.emailCT;
        const oldTenCT = company.tenCT;
        const oldSdt = company.sdtCT;

        req.body.moTa = he.decode(req.body.moTa);
        req.body.quyMo = parseInt(req.body.quyMo);

        const slug = slugHelper.convertToSlug(req.body.tenCT);
        req.body.slug = slug;

        const infoCompany = req.body;

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

        if(oldEmail != req.body.emailCT)
        {
            const existCompany = await CompanyModel.getCompanyByEmail(req.body.emailCT);
            const existEmailUser = await UserModel.getUserByEmail(req.body.emailCT);

            console.log("---------", existEmailUser);

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
                    const userIdFromUser = existEmailUser.userId;
                    // const userIdFromCty = 123;
                    if(userId != userIdFromUser)
                    {
                        req.flash("error", "Email trùng, vui lòng nhập lại!");
                        res.redirect("back");
                        return;
                    }
                }
            }
        }

        

        if(oldSdt != req.body.sdtCT)
        {
            const existSdt = await CompanyModel.getCompanyBySdt(req.body.sdtCT);

            console.log(existSdt);

            const existSdtUser = await UserModel.getUserBySdt(req.body.sdtCT);

            console.log(existSdtUser);

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
                    const userIdFromUser = existSdtUser.userId;
                    if(userIdFromUser != userId) // người này không là chủ sở hữu công ty 
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

        await CompanyModel.updateInfoCompany(infoCompany, congTyId);
        req.flash("success", "Cập nhật thông tin thành công!");
        res.redirect("back")
    } catch (error) {
        console.log(error);
        console.log("Lỗi trang cập nhật thông tin công ty - manage")
        res.redirect("/");
    }
}