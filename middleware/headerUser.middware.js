const UserModel = require("../models/User.model");
const CompanyModel = require("../models/Company.model");

module.exports.infoUser = async(req, res, next) => {
    const token = req.cookies.tokenUser;

    if(token)
    {
        const user = await UserModel.getUserByToken(token);
        if(user)
        {
            user.hoVaTen = user.ho + " " + user.ten;
            // var ngaySinh = user.ngaySinh;

            // // Định dạng ngày tháng
            // var ngay = ngaySinh.getDate().toString().padStart(2, '0'); // Lấy ngày và đảm bảo là 2 chữ số
            // var thang = (ngaySinh.getMonth() + 1).toString().padStart(2, '0'); // Lấy tháng (tháng bắt đầu từ 0) và đảm bảo là 2 chữ số
            // var nam = ngaySinh.getFullYear();

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

            res.locals.User = user;

            next();
            return;
        }
    }

    // nếu không đăng nhập hoặc sai token
    next();
} 