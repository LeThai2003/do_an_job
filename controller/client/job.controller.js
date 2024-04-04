const JobModel = require("../../models/Job.model");
const CompanyModel = require("../../models/Company.model");

// [GET] /jobs
module.exports.getAllJobs = async (req, res) => {
    var jobs = [];

    if(Object.keys(req.query).length > 0)
    {
          let luong1, luong2;
        if(req.query.luong == "all")
        {
            luong1 = 0;
            luong2 = 1000;
        }
        else
        {
            luong1 = parseInt(req.query.luong.split("-")[0]);
            luong2 = parseInt(req.query.luong.split("-")[1]);
        }

        let kn = "";
        let kinhNghiem = req.query.kinhnghiem;
        if(kinhNghiem == "all")
        {
            kn = '>= 0';
        }
        else if(kinhNghiem == "0")
        {
            kn = '= 0';
        }
        else if(kinhNghiem == "less1")
        {
            kn = '< 1';
        }
        else if(kinhNghiem == "1")
        {
            kn = '= 1';
        }
        else if(kinhNghiem == "2")
        {
            kn = '= 2';
        }
        else if(kinhNghiem == "3")
        {
            kn = '= 3';
        }
        else if(kinhNghiem == "4")
        {
            kn = '= 4';
        }
        else if(kinhNghiem == "5")
        {
            kn = '= 5';
        }
        else if(kinhNghiem == "over5")
        {
            kn = '> 5';
        }

        let vitri = req.query.vitri;

        let kv = req.query.khuvuc;

        let query = "";

        if(kv == "all")
        {
            query = `select * from CONGVIEC where (CONGVIEC.tenCV like '%${vitri}%') and (luong >= ${luong1} and luong <= ${luong2}) and (kinhNghiem ${kn})`;
        }
        else
        {
            kv = parseInt(kv);
            query = `select * from CONGVIEC, CONGVIEC_KHUVUC where (CONGVIEC.tenCV like '%${vitri}%') and (luong >= ${luong1} and luong <= ${luong2}) and (kinhNghiem ${kn}) and (CONGVIEC.maCV = CONGVIEC_KHUVUC.maCV) and (maKV = ${kv})`;       
        }

        jobs = await JobModel.getJobsByForm(query);
    }
    else
    {
        jobs = await JobModel.getAllJobs();
    }

    for (const job of jobs) {
        const company = await CompanyModel.getCompanyById(job.congTyId);
        // console.log(company);
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
