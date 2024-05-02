const CompanyModel = require("../../models/Company.model");

//[GET]/admin/dashboard/:congTyId
module.exports.index = async(req, res) => {
    try {

        const congTyId = req.params.congTyId;

        const company = await CompanyModel.getCompanyById(congTyId);

        res.render("admin/pages/dashboard/index", {
            title: "Trang tổng quan",
            company: company,
        })
    } catch (error) {
        res.redirect("/")
    }

    
}