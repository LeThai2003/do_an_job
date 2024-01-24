const mongoose = require("mongoose");

module.exports.connect = (url) => {
    mongoose.connect(url)
        .then(() => console.log('Connected!'));
}