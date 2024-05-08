module.exports.infoUser = (req, res, next) => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!req.body.name.trim())
    {
        req.flash("error", "Tên không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.email.trim())
    {
        req.flash("error", "Email không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.email.trim().match(emailRegex))
    {
        req.flash("error", "Email không đúng định dạng!");
        res.redirect("back");
        return;
    } 

    if(!req.body.ngaySinh)
    {
        req.flash("error", "Ngày sinh không được để trống!");
        res.redirect("back");
        return;
    }

    next();
}

module.exports.createCompany = (req, res, next) => {
    if(!req.body.tenCT.trim())
    {
        req.flash("error", "Tên không được để trống!");
        res.redirect("back");
        return;
    }
    if(!req.body.diaDiem.trim())
    {
        req.flash("error", "Địa chỉ công ty không được để trống!");
        res.redirect("back");
        return;
    }
    if(!req.body.sdtCT.trim())
    {
        req.flash("error", "Số điện thoại không được để trống!");
        res.redirect("back");
        return;
    }
    if(!req.body.emailCT.trim())
    {
        req.flash("error", "Email không được để trống!");
        res.redirect("back");
        return;
    }

    next();
}