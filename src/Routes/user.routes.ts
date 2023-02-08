import express from "express";
const userRouter = express.Router();
import { registerUser, loginUser, getOwnUserData } from "../Controllers/user.controller";
import protect from "../Middleware/auth.middleware";

const NAMESPACE = "UserRoutes";

userRouter.post("/users/register", registerUser);
userRouter.post("/users/login", loginUser);
userRouter.get("/users/me", protect, getOwnUserData);

export = userRouter