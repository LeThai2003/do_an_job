const CompanyModel = require("../../models/Company.model");
const JobModel = require("../../models/Job.model");
const timeApplyHelper = require("../../helpers/time-apply.helper")

//[GET]/companys
module.exports.index = async(req, res) => {

    var companies = await CompanyModel.getAllCompanies();
    var tenCT = "";
    var khuVuc;
    var query =``;
    
    if(req.query.tenCT)
    {
        tenCT = req.query.tenCT;
    }

    if(req.query.khuvuc)
    {
        khuVuc = req.query.khuvuc;

        if(khuVuc == 'kvuc')
        {
            query = `select * from CONGTY where (tenCT like N'%${tenCT}%')`;
        }
        else
        {
            query = `select * from CONGTY where (tenCT like N'%${tenCT}%') and (diaDiem like N'${khuVuc}%')`;
        }

        companies = await CompanyModel.getAllCompaniesBySearch(query);
    }
    

    console.log("--------------------------------------------------------")
    console.log(query);
    console.log(companies);
    console.log("--------------------------------------------------------")


    res.render("client/pages/company/index",{
        title: "Trang công ty",
        companies: companies
    })
}


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