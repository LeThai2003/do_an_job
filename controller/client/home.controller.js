const JobModel = require("../../models/Job.model");
const timeApplyHelper = require("../../helpers/time-apply.helper")

//[GET]/
module.exports.index =async (req, res) => {
    const getJobs = await JobModel.getAllJobs();

    const jobs = await timeApplyHelper.time(getJobs);

    res.render("client/pages/home/index.pug", {
        title: "Trang chủ",
        jobs: jobs 
    });
};