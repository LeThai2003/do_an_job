const homeRouter = require("./home.route");
const jobRouter = require("./job.route");

module.exports = (app) => {
    app.use("/", homeRouter);

    app.use("/job", jobRouter);
}
