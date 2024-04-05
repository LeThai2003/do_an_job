const JobModel = require("../../models/Job.model");
const CompanyModel = require("../../models/Company.model");
const timeApplyHelper = require("../../helpers/time-apply.helper")
const searchFormHelper = require("../../helpers/form-search.helper")

// [GET] /jobs
module.exports.getAllJobs = async (req, res) => {
    var getJobs = [];

    if(Object.keys(req.query).length > 0)
    {
        const query = searchFormHelper.search(req.query);
        getJobs = await JobModel.getJobsByForm(query);
    }
    else
    {
        getJobs = await JobModel.getAllJobs();
    }

    const jobs = await timeApplyHelper.time(getJobs);
    
    res.render("client/pages/job/index", {
        title: "Trang danh sách công việc",
        jobs: jobs 
    })
}

//[GET] /jobs/detail/:slug
module.exports.detail = async(req, res) => {
    const slugJob = req.params.slug;
    const jobs = await JobModel.getJobBySlug(slugJob);
    const job = jobs[0];
    const company = await CompanyModel.getCompanyById(job.congTyId);

    const getJobs = await JobModel.getJobOfCompany(job.congTyId);

    const jobOfCompany = await timeApplyHelper.time(getJobs);

    res.render("client/pages/job/detail.pug", {
        job: job,
        company: company,
        jobOfCompany: jobOfCompany
    });
}
