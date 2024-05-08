const CompanyModel = require("../../models/Company.model");

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