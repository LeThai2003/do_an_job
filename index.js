const express = require("express");
const app = express();
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const dotenv = require("dotenv");
const flash = require('express-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const connect = require("./config/database");
const moment = require('moment');

const routerClient = require("./routes/client/index.route");
const routerAdmin = require("./routes/admin/index.route");

dotenv.config();

connect.connectDB();

app.use(cookieParser('abcdefgh'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

const port = process.env.PORT;

app.use((req, res, next) => {
    res.locals.moment = moment;
    next();
});

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// create application/x-www-form-urlencoded parser
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

// router client
routerClient(app);
routerAdmin(app);

app.listen(port, () => {
    console.log("Đang chạy trên cổng: " + port);
});