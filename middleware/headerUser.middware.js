const UserModel = require("../models/User.model");
const CompanyModel = require("../models/Company.model");
const AnnounceModel = require("../models/Announce.model");
const JobModel = require("../models/Job.model");

module.exports.infoUser = async(req, res, next) => {
    const token = req.cookies.tokenUser;

    if(token)
    {
        const user = await UserModel.getUserByToken(token);
        if(user)
        {
            user.hoVaTen = user.ho + " " + user.ten;
            // var ngaySinh = user.ngaySinh;

            // console.log(ngaySinh);

            // // Định dạng ngày tháng
            // var ngay = ngaySinh.getDate().toString().padStart(2, '0'); // Lấy ngày và đảm bảo là 2 chữ số
            // var thang = (ngaySinh.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng (tháng bắt đầu từ 0) và đảm bảo là 2 chữ số
            // var nam = ngaySinh.getFullYear().toString();


            // // Tạo chuỗi định dạng ngày tháng
            // var ngaySinhFormatted = `${nam}-${thang}-${ngay}`;

            // user.ngaySinhFormatted = ngaySinhFormatted


            // ---- cong ty neu co ----
            const company = await CompanyModel.getInfoCompanyByIdUser(user.userId);
            if(company)
            {
                user.congTyId = company.congTyId; 
            }

            // console.log(user)

            
            // ---announce of user---
            const announces = await AnnounceModel.getAnnounceOfUser(user.userId);   
            if(announces)
            {
                for (const announce of announces) {
                    const infoCT_CV = await CompanyModel.getCompanyByMaCV(announce.maCV);
                    announce.infoCT_CV = infoCT_CV;
                }
            }

            const SoLuongChuaXem = await AnnounceModel.countAnnounceNotSeenOfUser(user.userId);
            announces.SoLuongChuaXem = SoLuongChuaXem.soluong;

            console.log(announces.SoLuongChuaXem)

            res.locals.User = user;
            res.locals.Announces = announces;

            next();
            return;
        }
    }

    // nếu không đăng nhập hoặc sai token
    next();
} 