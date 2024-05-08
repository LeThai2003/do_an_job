const CompanyModel = require("../../models/Company.model");
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

        req.body.moTa = he.decode(req.body.moTa);
        req.body.quyMo = parseInt(req.body.quyMo);

        const infoCompany = req.body;

        if(req.file && req.file.filename)
        {
            infoCompany.logo = `/uploads/${req.file.filename}`;
        }

        await CompanyModel.updateInfoCompany(infoCompany, congTyId);

        res.redirect("back")
    } catch (error) {
        console.log(error);
        console.log("Lỗi trang cập nhật thông tin công ty - manage")
        res.redirect("/");
    }
}