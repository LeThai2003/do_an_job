const dashboardRoute = require("./dashboard.route");
const jobManagementRoute = require("./job-management.route");
const cvManagementRoute = require("./cv-management.route");
const infoCompanyRoute = require("./info-company.route");
const announceRoute = require("./anounce.route");

const systemConfig = require("../../config/system");

module.exports = (app) => {
    const prefixAdmin = systemConfig.prefixAdmin;

    app.use(`/${prefixAdmin}/dashboard`, dashboardRoute);

    app.use(`/${prefixAdmin}/job-management`, jobManagementRoute);

    app.use(`/${prefixAdmin}/cv-management`, cvManagementRoute);

    app.use(`/${prefixAdmin}/infoCompany`, infoCompanyRoute);

    app.use(`/${prefixAdmin}/announce`, announceRoute);
}
