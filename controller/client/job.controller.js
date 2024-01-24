const Job = require("../../models/job.model");

//[GET]/job/
module.exports.index = (req, res) => {


    res.render("client/pages/job/index.pug");
}

//[GET]/job/:area
module.exports.searchForm = async(req, res) => {
    const area = req.params.area;
    const jobs = await Job.find({
        areas: {$in : [`${area}`]}
    })

    console.log(jobs);

    res.send("ok");
}

//[POST]/job/:area
module.exports.searchFormPOST = async (req, res) => {
    console.log(req.body);
    const area = req.body.area;
    var [salary1, salary2] = req.body.salary.split("-");

    const find = {
        deleted: false,

    };

    if(req.body.area != "area")
    {
        find.areas = {$in : [`${area}`]}
    }

    if(req.body.salary != "salary")
    {
        find.$expr= {
            $and: [
                { $gte: [{ $toInt: "$salary" }, parseInt(salary1)] },
                { $lte: [{ $toInt: "$salary" }, parseInt(salary2)] }
            ]
        }
    } 

    const jobs = await Job.find(find);

    console.log(jobs);
    res.send("---");
}