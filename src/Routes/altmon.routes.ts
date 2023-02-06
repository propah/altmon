import express from "express";
import{ getAltmons, deleteAltmon, getAltmon, postAltmon, putAltmon } from "../Controllers/altmon.controller";
const altmonRouter = express.Router();
const NAMESPACE = "AltmonRoutes";

altmonRouter.get("/altmons", getAltmons);

altmonRouter.get("/altmons/:id", getAltmon);

altmonRouter.post("/altmons", postAltmon);

altmonRouter.put("/altmons/:id", putAltmon);

altmonRouter.delete("/altmons/:id", deleteAltmon);

export = altmonRouter
