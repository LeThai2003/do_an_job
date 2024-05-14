const AnnounceModel = require("../models/Announce.model");

module.exports.clickButtonSubmit = () => {
    _io.once("connection", async (socket) => {
        console.log("Kết nối socket thành công!");
    
        socket.on("COMPANY_SEND_ANNOUNCE", async (data) => {
            console.log("----------------");
            console.log(data);
            console.log("----------------");
            // lưu thông tin vào db
            let type = "0";
            if(data.type == "accept")
            {
                type = "1";
            }
            await AnnounceModel.insertAnnounce(data.maCV, data.userId, data.thongBao, type);
        })
        
    });
}