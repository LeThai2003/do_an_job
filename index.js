const express = require("express");
const app = express();
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const dotenv = require("dotenv");
const database = require("./config/database");
const routerClient = require("./routes/client/index.route");

dotenv.config();

database.connect(process.env.MONGO_URL);

const port = process.env.PORT;

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// create application/x-www-form-urlencoded parser
app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

// router client
routerClient(app);

app.listen(port, () => {
    console.log("Đang chạy trên cổng: " + port);
});