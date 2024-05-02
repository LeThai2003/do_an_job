const JobModle = require("../../models/Job.model");
const CompanyModel = require("../../models/Company.model");
const JobEreaModel = require("../../models/Job-area.model");

const timeApplyHelper = require("../../helpers/time-apply.helper")


//[GET]/manage/job-management/:congTyId
module.exports.index = async(req, res) => {
    try {
        const congTyId = req.params.congTyId;

        var jobs = await JobModle.getJobOfCompany(congTyId);

        jobs = await timeApplyHelper.time(jobs);

        for (const job of jobs) {
            let areas = await JobEreaModel.getAreaOfJobByMaCV(job.maCV);
            let areaArray = [];
            if(areas)
            {
                for (const area of areas) {
                    areaArray.push(area.tenKV);
                }
            }
            job.khuVuc = areaArray.join(", ")
        }

        console.log(jobs);
        
        res.render("admin/pages/job-management/index", {
            title: "Trang quản lý việc làm",
            jobs: jobs
        });
    } catch (error) {
        res.redirect("/")
    }
}

