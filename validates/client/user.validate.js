module.exports.register = (req, res, next) => {

    if(!req.body.fullname)
    {
        req.flash("error", "Tên không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body["username-left"])
    {
        req.flash("error", "Email không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.password)
    {
        req.flash("error", "Mât khẩu không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.phone)
    {
        req.flash("error", "Số điện thoại không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.gender)
    {
        req.flash("error", "Giới tính không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.birthdate)
    {
        req.flash("error", "Ngày sinh không được để trống!");
        res.redirect("back");
        return;
    }

    next();
}


module.exports.login = (req, res, next) => {

    if(!req.body.email)
    {
        req.flash("error", "Email không được để trống!");
        res.redirect("back");
        return;
    }

    if(!req.body.password)
    {
        req.flash("error", "Mật khẩu không được để trống!");
        res.redirect("back");
        return;
    }

    next();
}

