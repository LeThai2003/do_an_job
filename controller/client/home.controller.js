const Job = require("../../models/job.model");

//[GET]/
module.exports.index =async (req, res) => {
    console.log(req.query);

    const area = req.query.area;

    const find = {
        deleted: false,
    };

    if(req.query.area != "all")
    {
        find.areas = {$in : [`${area}`]}
    }

    if (req.query.salary && req.query.salary !== "all") {
        var [salary1, salary2] = req.query.salary.split("-");
        find.$expr = {
            $and: [
                { $gte: [{ $toInt: "$salary" }, parseInt(salary1)] },
                { $lte: [{ $toInt: "$salary" }, parseInt(salary2)] },
            ],
        };
    }

    if(req.query.experience && req.query.experience !== "all")
    {
        find.experiences = req.query.experience;
    }

    const jobs = await Job.find(find);

    console.log(find);
    console.log(jobs);

    res.render("client/pages/home/index.pug", {
        jobs : jobs
    });
};