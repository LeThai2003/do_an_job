const express = require("express");
const app = express();
const dotenv = require("dotenv");
const database = require("./config/database");
const routerClient = require("./routes/client/index.route");

dotenv.config();

database.connect(process.env.MONGO_URL);

const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");



// router client
routerClient(app);

app.listen(port, () => {
    console.log("Đang chạy trên cổng: " + port);
});