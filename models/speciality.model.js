const mongoose = require("mongoose");

const specialitySchema = new mongoose.Schema({
    value: String
});

const Speciality = mongoose.model("Speciality", specialitySchema, "speciality");

module.exports = Speciality;