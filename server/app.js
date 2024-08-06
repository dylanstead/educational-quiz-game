const express = require("express");
const cors = require("cors");

const logger = require("./logger");
const userRouter = require("./routers/users");
const scoreRouter = require("./routers/scores");

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);
app.use("/users", userRouter);
app.use("/scores", scoreRouter)

module.exports = app;
