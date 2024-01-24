const mongoose = require("mongoose");

const jobDetailSchemal = new mongoose.Schema({
    idCompany: String,
    idJob: String,
    idUser: String,
    statusRead: {
        type: Boolean,
        default: false,
    },
    linkProject: String,
    createAt: Date,
    area: String, 
    deleted:{
        type: Boolean,
        default: false 
    }
});

const JobDetail = mongoose.model("JobDetail", jobDetailSchemal, "jobDetails");

module.exports = JobDetail;