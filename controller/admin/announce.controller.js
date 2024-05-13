const AnnounceModel = require("../../models/Announce.model");


// [POST] /manage/anounce/:congTyId/:maCV/:userId
module.exports.index = async (req, res) => {

    const congTyId = req.params.congTyId;
    const maCV = req.params.maCV;
    const userId = req.params.userId;

    await AnnounceModel.insertAnnounce(maCV, userId, req.body.thongBao);

    // SocketIO
    _io.once("connection", (socket) => {

        console.log("Kết nối socket thành công!");
        
        socket.broadcast.emit("SERVER_SEND_ANNOUNCE", {
            userId: userId,
            maCV: maCV
        });

    });
    
    // End SocketIO
    req.flash("success", "Đã chấp nhận CV");
    res.redirect("back");
};