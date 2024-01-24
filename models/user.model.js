const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    gender: Boolean,
    birthday: Date,
    deleted:{
        type: Boolean,
        default: false 
    },
    email: String,
    admin:String
});
// mật khẩu tài khoản để làm sau

const User = mongoose.model("User", userSchema, "Users");

module.exports = User;

