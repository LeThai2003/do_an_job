// [POST] /manage/anounce/:congTyId//:maCV/:userId
module.exports.index = async (req, res) => {

    const congTyId = req.params.congTyId;
    const maCV = req.params.maCV;
    const userId = req.params.userId;

    console.log(congTyId);
    console.log(maCV);
    console.log(userId);

    console.log(req.body);

    // SocketIO
    _io.once("connection", (socket) => {
        console.log("Kết nối socket thành công!");
    });
    
    // End SocketIO
    req.flash("success", "Đã chấp nhận CV");
    res.redirect("back");
};