const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({  
    idUser: String,
    idAdmin: String,
    statusRead:{
        type: Boolean,
        default: false
    },
    content: String,
    deleted:{
        type: Boolean,
        default: false 
    }
});

const Message = mongoose.model("Message", messageSchema, "messages");

module.exports = Message;