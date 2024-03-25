const JobModel = require("../../models/Job.model");
const CompanyModel = require("../../models/Company.model");

// [GET] /jobs
module.exports.getAllJobs = async (req, res) => {
    const jobs = await JobModel.getAllJobs();

    for (const job of jobs) {
        const company = await CompanyModel.getCompanyById(job.congTyId);
        console.log(company);
        job.company = company

        const ngayTao = new Date(job.ngayTao);
        const ngayHienTai = new Date();
        const soNgayTuNgayKhoiTao = Math.floor((ngayHienTai - ngayTao) / (1000 * 60 * 60 * 24));

        job.soNgayTuNgayKhoiTao = soNgayTuNgayKhoiTao;
    }
    
    res.render("client/pages/job/index", {
        title: "Trang danh sách công việc",
        jobs: jobs 
    })
}
