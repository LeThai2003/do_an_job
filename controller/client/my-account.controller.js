

//[GET]/
module.exports.index = async(req, res) => {

    res.render("client/pages/my-account/index",{
        title: "Trang công ty"
    })
}