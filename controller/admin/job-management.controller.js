const JobModle = require("../../models/Job.model");
const CompanyModel = require("../../models/Company.model");
const JobEreaModel = require("../../models/Job-area.model");
const AreaModel = require("../../models/Area.model");


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
            jobs: jobs,
            congTyId: congTyId
        });
    } catch (error) {
        res.redirect("/")
    }
}

//[GET]/manage/job-management/:congTyId/create
module.exports.create = async(req, res) => {
    try {
        const congTyId = req.params.congTyId;

        const areas = await AreaModel.getAllAreasWithMaTen();

        // console.log(JSON.stringify(areas));
        
        res.render("admin/pages/job-management/create", {
            title: "Trang tạo mới việc làm",
            congTyId: congTyId,
            areas: JSON.stringify(areas)
        });
    } catch (error) {
        res.redirect("/")
    }
}

//[Post]/manage/job-management/:congTyId/create
module.exports.createPost = async(req, res) => {
    try {
        const congTyId = req.params.congTyId;

        console.log(req.body);

        const areas = JSON.parse(req.body.ids);

        console.log(congTyId);
        console.log(areas);
        
        res.send("ok");
    } catch (error) {
        res.redirect("/")
    }
}



