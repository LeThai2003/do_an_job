const CompanyModel = require("../../models/Company.model");
const JobModel = require("../../models/Job.model");
const JobDetailModel = require("../../models/Job-detail.model");
const UserModel = require("../../models/User.model");
const AreaModel = require("../../models/Area.model");
const selectionSortHelper = require("../../helpers/selection-sort.helper");
const filterStatusHelper = require("../../helpers/filter-status.helper");


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

        const filterStatus = filterStatusHelper.cv(req.query);

        if(req.query.status)
        {
            const status = req.query.status;
            jobsDetail = filterStatusHelper.cvList(status, jobsDetail);
        }

        //--mặc định ngày gửi mới nhất ~~ ngày gửi giảm dần
        jobsDetail.sort((a, b) => new Date(b.thoiGianNop) - new Date(a.thoiGianNop));

        const sortObj = selectionSortHelper.cv();

        if(req.query.sortKey && req.query.sortValue)
        {
            const sortKey = req.query.sortKey;
            const sortValue = req.query.sortValue;

            jobsDetail = selectionSortHelper.cvSort(sortKey, sortValue, jobsDetail);
        }


        res.render("admin/pages/cv-management/index", {
            title: "Trang danh sách cv",
            jobsDetail: jobsDetail,
            filterStatus,
            sortObj
        })

    } catch (error) {
        console.log(error);
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

