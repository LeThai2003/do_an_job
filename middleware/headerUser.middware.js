const UserModel = require("../models/User.model");

module.exports.infoUser = async(req, res, next) => {
    const token = req.cookies.tokenUser;

    if(token)
    {
        const user = await UserModel.getUserByToken(token);
        if(user)
        {
            res.locals.User = user;
            next();
            return;
        }
    }

    // nếu không đăng nhập hoặc sai token
    next();
} 