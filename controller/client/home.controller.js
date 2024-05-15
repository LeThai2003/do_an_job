const JobModel = require("../../models/Job.model");
const CompanyModel = require("../../models/Company.model");
const timeApplyHelper = require("../../helpers/time-apply.helper")
const announceSocket = require("../../socket/announce-client.socket");


//[GET]/
module.exports.index =async (req, res) => {
    const getJobs = await JobModel.getAllJobs();

    var jobs = await timeApplyHelper.time(getJobs);

    jobs = jobs.reverse().slice(0,6);

    var companies = await CompanyModel.getAllCompanies();
    companies = companies.slice(0,2);

    // SocketIO
    announceSocket();
    // End SocketIO

    res.render("client/pages/home/index.pug", {
        title: "Trang chủ",
        jobs: jobs,
        companies: companies
    });
};