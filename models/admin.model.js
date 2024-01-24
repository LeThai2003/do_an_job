const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    idUser: String,
    nameCompany: String,
    phone: String,
    email: String,
    address: String,
    quantityEmp: Number,
    description: String,
    logo: String,
    deleted:{
        type: Boolean,
        default: false 
    }
});

const Admin = mongoose.model("Admin", adminSchema, "admins");

module.exports = Admin;