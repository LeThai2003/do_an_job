const AnnounceModel = require("../../models/Announce.model");
const CompanyModel = require("../../models/Company.model");
const JobModel = require("../../models/Job.model");


// [POST] /manage/anounce/:congTyId/:maCV/:userId
module.exports.index = async (req, res) => {

    const congTyId = req.params.congTyId;
    const maCV = req.params.maCV;
    const userId = req.params.userId;

    await AnnounceModel.insertAnnounce(maCV, userId, req.body.thongBao);

    // SocketIO
    _io.once("connection", async (socket) => {
        console.log("Kết nối socket thành công!");

        // ----trả ra giao diện real-time ----
        const infoCT_CV = await CompanyModel.getCompanyByMaCV(maCV);

        console.log(infoCT_CV);
        
        socket.broadcast.emit("SERVER_SEND_ANNOUNCE", {
            userId: userId,
            maCV: maCV,
            infoCT_CV: infoCT_CV
        });

        // ---trả ra số lượng thông báo chưa xem---
        const soLuongChuaXem = await AnnounceModel.countAnnounceNotSeenOfUser(userId);
        socket.broadcast.emit("SERVER_SEND_LENGTH_ANNOUNCE_NOTSEEN", {
            userId: userId,
            soLuongChuaXem: soLuongChuaXem.soluong
        });

    });
    
    // End SocketIO
    req.flash("success", "Đã chấp nhận CV");
    res.redirect("back");
};