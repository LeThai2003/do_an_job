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