// [POST] /manage/anounce/:congTyId/:userId
module.exports.index = async (req, res) => {
    // SocketIO
    _io.once("connection", (socket) => {
        console.log("Kết nối socket thành công!");
    });
    
    // End SocketIO
    req.flash("success", "Đã chấp nhận CV");
    res.redirect("back");
};