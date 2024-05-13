const JobModel = require("../../models/Job.model");
const timeApplyHelper = require("../../helpers/time-apply.helper")
const announceSocket = require("../../socket/announce-client.socket");


//[GET]/
module.exports.index =async (req, res) => {
    const getJobs = await JobModel.getAllJobs();

    const jobs = await timeApplyHelper.time(getJobs);

    // SocketIO
    announceSocket();
    // End SocketIO

    const User = res.locals.User;

    res.render("client/pages/home/index.pug", {
        title: "Trang chủ",
        jobs: jobs 
    });
};