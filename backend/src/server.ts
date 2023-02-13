import express from "express";

import logging from "./Config/logging";
import config from "./Config/config";

import altmonRouter from "./Routes/altmon.routes";
import userRouter from "./Routes/user.routes";

import errorHandler from "./Middleware/error.middleware";
import connectDB from "./Config/db";

import cors from "cors";
const NAMESPACE = "Server";

connectDB();

const app = express();

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options));
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
