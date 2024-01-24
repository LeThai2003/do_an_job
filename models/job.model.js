const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    nameCV: String,
    idCompany: String,
    salary: String,
    specialities:[],
    description: String,
    deleted:{
        type: Boolean,
        default: false 
    },
    createAt: Date,
    deadline: Date,
    areas: [],
    status: Boolean
});

const Job = mongoose.model("Job", jobSchema, "jobs");

module.exports = Job;