const CompanyModel = require("../../models/Company.model");
const JobModel = require("../../models/Job.model");
const JobDetailModel = require("../../models/Job-detail.model");
const UserModel = require("../../models/User.model");
const AreaModel = require("../../models/Area.model");


//[GET] /manage/cv-managemant/:congTyId
module.exports.index = async(req, res) => {
    try {
        
        const congTyId = req.params.congTyId;

        // -- Lấy danh sách mã công việc của công ty đó
        const jobOfCompany = await JobModel.getJobOfCompany(congTyId);
        let listMaCV = jobOfCompany.map(job => job.maCV);

        //--- Lấy CV đã ứng tuyển thuộc công việc của công ty đó
        let jobsDetail = [];
        const datas = await JobDetailModel.getAllJobDetails();
        datas.forEach(data => {
            if(listMaCV.includes(data.maCV))
            {
                jobsDetail.push(data);
            }
        });

        
        // gộp thông tin để trả ra giao diện
    
        for (const jobDetail of jobsDetail) {
            const infoJob = await JobModel.getJobNameByMaCV(jobDetail.maCV);
            const infoUser = await UserModel.getInfoUserByUserId(jobDetail.userId);
            const infoArea = await AreaModel.getAreasWithMaKV(jobDetail.khuVucUT);

            jobDetail.infoJob = infoJob;
            jobDetail.infoUser = infoUser;
            jobDetail.infoArea = infoArea;
        }


        res.render("admin/pages/cv-management/index", {
            title: "Trang danh sách cv",
            jobsDetail: jobsDetail
        })

    } catch (error) {
        console.log("Lỗi trang cv-management");
        res.redirect("/");   
    }
}

//[GET] /manage/cv-managemant/:congTyId/detail/:maCTCV
module.exports.detailCV = async(req, res) => {
    try {
        
        const maCTCV = req.params.maCTCV;

        JobDetailModel.updateDaXemCV(maCTCV);

        const jobDetail = await JobDetailModel.getJobDetailByMaCTCV(maCTCV);

        const infoJob = await JobModel.getJobNameByMaCV(jobDetail.maCV);
        const infoUser = await UserModel.getInfoUserByUserId(jobDetail.userId);
        const infoArea = await AreaModel.getAreasWithMaKV(jobDetail.khuVucUT);

        jobDetail.infoJob = infoJob;
        jobDetail.infoUser = infoUser;
        jobDetail.infoArea = infoArea;


        res.render("admin/pages/cv-management/detail", {
            title: "Trang danh sách cv",
            jobDetail: jobDetail
        })

    } catch (error) {
        console.log("Lỗi trang chi tiết cv");
        res.redirect("/");   
    }
}

