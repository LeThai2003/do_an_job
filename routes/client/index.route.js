const homeRouter = require("./home.route");
const jobRouter = require("./job.route");
const companyRoute = require("./compay.route")
const userRoute = require("./user.route")
const myAccountRoute = require("./my-account.route");

const navigationMenuMiddleware = require("../../middleware/navigationMenu");
const headerMenuMiddleware = require("../../middleware/headerUser.middware");

module.exports = (app) => {
    app.use(headerMenuMiddleware.infoUser);

    app.use("/", navigationMenuMiddleware.index, homeRouter);

    app.use("/jobs", navigationMenuMiddleware.index, jobRouter);

    app.use("/companys" , navigationMenuMiddleware.index, companyRoute);

    app.use("/my-account", myAccountRoute);

    app.use("/user", userRoute);
}
