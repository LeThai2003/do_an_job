const JobModel = require("../../models/Job.model");
const CompanyModel = require("../../models/Company.model");
const JobDetailModel = require("../../models/Job-detail.model");
const JobAreaModel = require("../../models/Job-area.model");
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
    try {
        const userId = res.locals.User.userId;

        const slugJob = req.params.slug;
        const job = await JobModel.getJobBySlug(slugJob);

        const company = await CompanyModel.getCompanyById(job.congTyId);

        const getJobs = await JobModel.getJobOfCompany(job.congTyId);

        const jobOfCompany = await timeApplyHelper.time(getJobs);

        const jobAreas = await JobAreaModel.getAreaOfJob(slugJob);

        //lay congTyId của user nếu có
        let congTyUser = await CompanyModel.getInfoCompanyByIdUser(userId);

        const congTyUserId = congTyUser.congTyId;

        res.render("client/pages/job/detail.pug", {
            job: job,
            company: company,
            jobOfCompany: jobOfCompany,
            jobAreas: jobAreas,
            congTyUserId: congTyUserId
        });
    } catch (error) {
        console.log("Công việc đã bị xóa Hoặc Slug bị sai");
        res.redirect("/");
    }
}

//[POST] /jobs/apply-job/:maCV
module.exports.applyJob = async(req, res) => {

    try {
        const maCV = req.params.maCV;
        const userId = res.locals.User.userId;
        const jobDetail = {};

        jobDetail.maCV = maCV;
        jobDetail.userId = userId;
        jobDetail.pdf = `/uploads/${req.file.filename}`;
        jobDetail.khuVucUT = req.body.khuVucUT;

        console.log(jobDetail);

        await JobDetailModel.insertJobDetail(jobDetail);

        res.send("ok");
    
        // res.render("client/pages/job/test", {
        //     title: "file"
        // });
    } catch (error) {
            console.log("lỗi ở nộp đơn")
            redirect("/");
    }
}
