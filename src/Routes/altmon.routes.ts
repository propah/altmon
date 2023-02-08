import express from "express";
import{ getAltmons, deleteAltmon, getAltmon, postAltmon, putAltmon } from "../Controllers/altmon.controller";
import protect from "../Middleware/auth.middleware";
const altmonRouter = express.Router();
const NAMESPACE = "AltmonRoutes";

altmonRouter.get("/altmons", getAltmons);

altmonRouter.get("/altmons/:id", getAltmon);

altmonRouter.post("/altmons", protect, postAltmon);

altmonRouter.put("/altmons/:id", protect, putAltmon);

altmonRouter.delete("/altmons/:id", deleteAltmon);

export = altmonRouter
