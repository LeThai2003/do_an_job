const JobModel = require("../../models/Job.model");
const CompanyModel = require("../../models/Company.model");

// [GET] /jobs
module.exports.getAllJobs = async (req, res) => {
    const jobs = await JobModel.getAllJobs();

    for (const job of jobs) {
        const company = await CompanyModel.getCompanyById(job.congTyId);
        console.log(company);
        job.company = company
    }
    
    res.render("client/pages/job/index", {
        title: "Trang danh sách công việc",
        jobs: jobs 
    })
}
