const homeRouter = require("./home.route");
const jobRouter = require("./job.route");
const companyRoute = require("./compay.route")
const userRoute = require("./user.route")
const navigationMenuMiddleware = require("../../middleware/navigationMenu");
module.exports = (app) => {
    app.use("/", navigationMenuMiddleware.index, homeRouter);

    app.use("/jobs", navigationMenuMiddleware.index, jobRouter);

    app.use("/companys/" , companyRoute);

    app.use("/user", userRoute);
}
