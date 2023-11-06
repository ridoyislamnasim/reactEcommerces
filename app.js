// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const path = require('path');
const path = require("path");
const cors = require("cors")


// router import
const router = require("./router/auth/authRouter");
const admin = require("./router/admin/adminRouter");
const common = require("./router/common/commonRouter");

// internal imports
// const {
//     notFoundHandler,
//     errorHandler,
// } = require("./middleware/common/errorHandler");

// middleWare 

const app = express();
dotenv.config();
// set view engine
app.set("views", "./views");
// app.use(cors())
app.use(cors({
    origin: 'http://localhost:3000',  // Allow requests from localhost:3000
    credentials: true  // Enable credentials (cookies, HTTP authentication)
}));
// database connection
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("database connection successful! ------------------------------------------------------------------------------"))
    .catch((err) => console.log('database connection error -----', err));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set static folder
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

// parse cookies
// app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/auth", router);
app.use("/admin", admin);
app.use("/shop", common);

// 404 not found handler
// app.use(notFoundHandler);

// common error handler
// app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`app listening to port `, process.env.PORT);
});