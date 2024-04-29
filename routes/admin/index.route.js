const dashboardRoute = require("./dashboard.route");

const systemConfig = require("../../config/system");

module.exports = (app) => {
    const prefixAdmin = systemConfig.prefixAdmin;

    app.use(`/${prefixAdmin}/dashboard`, dashboardRoute);
}
