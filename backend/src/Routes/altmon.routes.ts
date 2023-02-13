import express from "express";
import{ getAltmons, deleteAltmon, getAltmon, createAltmon, updateAltmon } from "../Controllers/altmon.controller";
import { protect, adminOnly } from "../Middleware/auth.middleware";
const altmonRouter = express.Router();
const NAMESPACE = "AltmonRoutes";

altmonRouter.get("/altmons", getAltmons);

altmonRouter.get("/altmons/:id", getAltmon);

altmonRouter.post("/altmons", protect, adminOnly, createAltmon);

altmonRouter.put("/altmons/:id", protect, updateAltmon);

altmonRouter.delete("/altmons/:id", protect, deleteAltmon);

export = altmonRouter
