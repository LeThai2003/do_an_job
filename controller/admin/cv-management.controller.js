//[GET] /manage/cv-managemant/:congTyId
module.exports.index = async(req, res) => {

    res.render("admin/pages/cv-management/index", {
        title: "Trang danh sách CV"
    });
}