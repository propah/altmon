import express from "express";
import{ getAltmons, deleteAltmon, getAltmon, postAltmon, putAltmon } from "../Controllers/altmon.controller";
const altmon_router = express.Router();
const NAMESPACE = "AltmonRoutes";

altmon_router.get("/altmons", getAltmons);

altmon_router.get("/altmons/:id", getAltmon);

altmon_router.post("/altmons", postAltmon);

altmon_router.put("/altmons/:id", putAltmon);

altmon_router.delete("/altmons/:id", deleteAltmon);

export = altmon_router
