const AnnounceModel = require("../../models/Announce.model");
const announceSocket = require("../../socket/announce-client.socket");

//[GET]/announce/:maCV/:maUser
module.exports.index = async(req, res) => {

    // SocketIO
    announceSocket();
    // End SocketIO

    res.render("client/pages/announce/index", {
        title: "Trang kết quả"
    })
}

//[POST] /announce/:maCV/:maUser
module.exports.announcePost = async(req, res) => {

    res.send("ok");
}