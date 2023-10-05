const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
require("express-async-errors");

const { MONGODB_URL, COOKIE_SECRET } = require("./utils/config");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/authRoutes");

const app = express();

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        console.log("connected to MongoDB");
    })
    .catch((error) => {
        console.error(`error connection to MongoDB ${error.message}`);
    });

app.use(cors());
app.use(express.json());
app.use(
    cookieSession({
        name: "eternite-session",
        keys: [COOKIE_SECRET],
    })
);

app.use("/api/auth", authRoutes);

app.use(errorHandler);

module.exports = app;
