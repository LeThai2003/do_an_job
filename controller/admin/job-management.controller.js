const JobModle = require("../../models/Job.model");
const CompanyModel = require("../../models/Company.model");
const JobEreaModel = require("../../models/Job-area.model");
const JobDetailModel = require("../../models/Job-detail.model");
const AreaModel = require("../../models/Area.model");
const SpecialityModel = require("../../models/Specialty.model");
const JobSpecialityModel = require("../../models/Job-speciality.model");
const slugHelper = require("../../helpers/convert-to-slug.helper");
const hotTroFormSearchHelper = require("../../helpers/ho-tro-form-search");



const he = require('he');


const timeApplyHelper = require("../../helpers/time-apply.helper")


//[GET]/manage/job-management/:congTyId
module.exports.index = async(req, res) => {
    try {
        const congTyId = req.params.congTyId;

        var jobs = await JobModle.getJobOfCompany(congTyId);

        jobs = await timeApplyHelper.time(jobs);

        for (const job of jobs) {
            let areas = await JobEreaModel.getAreaOfJobByMaCV(job.maCV);
            let areaArray = [];
            if(areas)
            {
                for (const area of areas) {
                    areaArray.push(area.tenKV);
                }
            }
            job.khuVuc = areaArray.join(", ")
        }
        
        res.render("admin/pages/job-management/index", {
            title: "Trang quản lý việc làm",
            jobs: jobs,
            congTyId: congTyId
        });
    } catch (error) {
        res.redirect("/")
    }
}

//[GET]/manage/job-management/:congTyId/create
module.exports.create = async(req, res) => {
    try {
        const congTyId = req.params.congTyId;

        let areas = await AreaModel.getAllAreasWithMaTen();
        areas = JSON.stringify(areas);

        let specialities = await SpecialityModel.getAllSpecialtiesWithMaTen();
        specialities = JSON.stringify(specialities);

        const objKinhNghiem = hotTroFormSearchHelper.kinhNghiem;
        
        res.render("admin/pages/job-management/create", {
            title: "Trang tạo mới việc làm",
            congTyId: congTyId,
            areas: areas,
            specialities: specialities,
            objKinhNghiem: objKinhNghiem
        });
    } catch (error) {
        res.redirect("/")
    }
}


//[Post]/manage/job-management/:congTyId/create
module.exports.createPost = async(req, res) => {
    try {
        const congTyId = req.params.congTyId;


        // console.log("-----------------");
        // console.log(req.body)
        req.body.chiTietCV = he.decode(req.body.chiTietCV);
        // console.log(req.body.chiTietCV)
        // console.log("-----------------");

        // Tạo công việc trước để có congTyId
        const slugCV = slugHelper.convertToSlug(req.body.tenCV);
        req.body.slug = slugCV;

        await JobModle.insertJob(congTyId, req.body);  // Lưu job vào db

        //Lấy maCV
        const job = await JobModle.getJobBySlug(slugCV);
        const maCV = job.maCV;

        const areas = JSON.parse(req.body.idsArea);
        console.log(areas)

        const tags = JSON.parse(req.body.tagsName);  // Tags get from form (user input)
        let tagsNameFromTable = await SpecialityModel.getAllSpecialtiesWithTen();  // Lấy tên tất cả tag trong table
        let tagsName = [];

        tagsNameFromTable.forEach(item => {
            tagsName.push(item.tenLV);  // Vì mảng lấy từ database có dạng [{tenLV: 'html'}, {}, {}]... -> tạo mảng mới chỉ toàn là tên thôi
        })

        for (const tag of tags) {
            if (!tagsName.includes(tag)) // Nếu tag không tồn tại thì thêm vào table 
            {
                // console.log(tag);
                await SpecialityModel.insertSpecialtyByName(tag);
            }
        }

        let tagsNameAndMaFromTable = await SpecialityModel.getAllSpecialtiesWithMaTen();  // Lấy lại thông tin mã lĩnh vực và tên lĩnh vực trong bảng

        for (const data of tagsNameAndMaFromTable) {
            if(tags.includes(data.tenLV)){ // Nếu tenLV nào có trong tags user nhập vào -> insert
                await JobSpecialityModel.insertJobSpeciality(maCV, data.maLV);
                // console.log(data.tenLV)
            }
        }

        for (const maKV of areas) {
            await JobEreaModel.insertJobArea(maCV, maKV);
        }
        
        res.redirect("back");
    } catch (error) {
        res.redirect("/")
    }
}

//[GET]/manage/job-management/:congTyId/detail/:slugCV
module.exports.detail = async(req, res) => {
    try {
        const congTyId = req.params.congTyId;
        const slug = req.params.slugCV;

        const job = await JobModle.getJobBySlug(slug);

        const objKinhNghiem = hotTroFormSearchHelper.kinhNghiem;

        job.tenKinhNghiem =  objKinhNghiem.find(item => item.value == job.kinhNghiem).name;

        let areaOfJob = await JobEreaModel.getAreaOfJob(job.slug);
        areaOfJob = areaOfJob.map(item => item.tenKV);

        job.tenKhuVuc = areaOfJob.join(", ")

        const JobDetailOfJOb = await JobDetailModel.getAllJobByMaCV(job.maCV);
        let acceptEdit = 1;

        if(JobDetailOfJOb.length > 0){
            acceptEdit = 0;
        }


        res.render("admin/pages/job-management/detail", {
            title: "Trang chi tiết công việc",
            job: job,
            acceptEdit: acceptEdit,
        })

    } catch (error) {
        res.redirect("/")
    }
}

//[GET]/manage/job-management/:congTyId/edit/:slugCV
module.exports.edit = async(req, res) => {
    try {
        const congTyId = req.params.congTyId;
        const slug = req.params.slugCV;

        let areas = await AreaModel.getAllAreasWithMaTen();
        areas = JSON.stringify(areas);

        let specialities = await SpecialityModel.getAllSpecialtiesWithMaTen();
        specialities = JSON.stringify(specialities);

        const job = await JobModle.getJobBySlug(slug);

        const objKinhNghiem = hotTroFormSearchHelper.kinhNghiem;

        job.tenKinhNghiem =  objKinhNghiem.find(item => item.value == job.kinhNghiem).name;

        let areaOfJob = await JobEreaModel.getAreaOfJob(job.slug);
        areaOfJob = areaOfJob.map(item => item.tenKV);

        job.tenKhuVuc = areaOfJob.join(", ")

        let tagsJob = await JobSpecialityModel.getNameSpecialityOfCV(job.maCV);
        tagsJob = tagsJob.map(item => item.tenLV);

        job.tenLinhVuc = tagsJob.join(", ");

        res.render("admin/pages/job-management/edit", {
            title: "Trang chỉnh sửa công việc",
            job: job,
            objKinhNghiem,
            areas,
            specialities
        })

    } catch (error) {
        res.redirect("/")
    }
}

//[POST]/manage/job-management/:congTyId/edit/:maCV
module.exports.postEdit = async(req, res) => {
    try {
        const congTyId = req.params.congTyId;
        const maCV = req.params.maCV;

        console.log(req.body);
        req.body.chiTietCV = he.decode(req.body.chiTietCV);

        await JobModle.updateJob(maCV, req.body);

        // --- xoa tag-job ... và area-job trước khi cập nhật--
        await JobSpecialityModel.deleteSpecialityArea(maCV);
        await JobEreaModel.deleteJobArea(maCV);
        // --- xoa tag-job ... và area-job trước khi cập nhật--

        const areas = JSON.parse(req.body.idsArea);

        const tags = JSON.parse(req.body.tagsName);  // Tags get from form (user input)
        let tagsNameFromTable = await SpecialityModel.getAllSpecialtiesWithTen();  // Lấy tên tất cả tag trong table
        let tagsName = tagsNameFromTable.map(item => item.tenLV);  // Vì mảng lấy từ database có dạng [{tenLV: 'html'}, {}, {}]... -> tạo mảng mới chỉ toàn là tên thôi

        //--tag--
        for (const tag of tags) {
            if (!tagsName.includes(tag)) // Nếu tag không tồn tại thì thêm vào table 
            {
                // console.log(tag);
                await SpecialityModel.insertSpecialtyByName(tag);
            }
        }

        let tagsNameAndMaFromTable = await SpecialityModel.getAllSpecialtiesWithMaTen();  // Lấy lại thông tin mã lĩnh vực và tên lĩnh vực trong bảng

        for (const data of tagsNameAndMaFromTable) {
            if(tags.includes(data.tenLV)){ // Nếu tenLV nào có trong tags user nhập vào -> insert
                await JobSpecialityModel.insertJobSpeciality(maCV, data.maLV);
                // console.log(data.tenLV)
            }
        }

        //--KV--
        for (const maKV of areas) {
            await JobEreaModel.insertJobArea(maCV, maKV);
        }
        
        req.flash("success", "Chỉnh sửa công việc thành công!");
        res.redirect("back");

    } catch (error) {
        res.redirect("/")
    }
}



