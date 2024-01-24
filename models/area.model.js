const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({  
    name: String,
    deleted:{
        type: Boolean,
        default: false 
    }
});

const Area = mongoose.model("Area", areaSchema, "areas");

module.exports = Area;