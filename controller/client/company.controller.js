const CompanyModel = require("../../models/Company.model");
const JobModel = require("../../models/Job.model");
const timeApplyHelper = require("../../helpers/time-apply.helper")


//[GET] /companys/detail/:slug
module.exports.detail = async(req, res) => {
    const slugCom = req.params.slug;

    const company = await CompanyModel.getCompanyBySlug(slugCom);

    const inforAdmin = await CompanyModel.getInfoUserOfCompany(company.congTyId);

    const getJobs = await JobModel.getJobOfCompany(company.congTyId);
    const jobOfCompany = await timeApplyHelper.time(getJobs);

    res.render("client/pages/company/detail.pug", {
        company: company,
        inforAdmin: inforAdmin,
        jobOfCompany: jobOfCompany
    });
}