const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("express-async-errors");

const { MONGODB_URL } = require("./utils/config");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/authRoutes");
const usersRoutes = require("./routes/usersRoutes");

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

app.use(express.static("dist"));

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

app.use(errorHandler);

module.exports = app;
