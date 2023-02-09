import express from "express";

import logging from "./Config/logging";
import config from "./Config/config";

import altmonRouter from "./Routes/altmon.routes";
import userRouter from "./Routes/user.routes";

import errorHandler from "./Middleware/error.middleware";
import connectDB from "./Config/db";
const NAMESPACE = "Server";

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', altmonRouter)
app.use('/api', userRouter)

app.use(errorHandler);

app.listen(+config.server.port, config.server.hostname, () => {
  logging.info(
    NAMESPACE,
    `Running on ${config.server.hostname}:${config.server.port}`
  );
});
