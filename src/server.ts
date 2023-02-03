import express from "express";
import logging from "./Config/logging";
import config from "./Config/config";
import router from "./Routes/pokemon.routes";
import errorHandler from "./Middleware/error.middleware";

const NAMESPACE = "Server";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router)

app.use(errorHandler);

app.listen(+config.server.port, config.server.hostname, () => {
  logging.info(
    NAMESPACE,
    `Running on ${config.server.hostname}:${config.server.port}`
  );
});
