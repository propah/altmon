import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import { User, IUser } from "../Models/user.model";
import { Request, Response, NextFunction } from 'express';
import logging from "../Config/logging";

const NAMESPACE = "AuthMiddleware";

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!process.env.JWT_SECRET) {
        logging.error(NAMESPACE, "JWT_SECRET is undefined");
        throw new Error("JWT_SECRET is undefined");
    }
    let token;
    try {
        if (!req.headers["x-access-token"]) {
            res.status(401).json({ message: "Not authorized" });
            return;
        }
        token = req.headers["x-access-token"].toString();
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
        const user = await User.findById(decoded.id);
        res.locals.user = user;
        next();
    } catch (err) {
        if (err instanceof Error) {
            logging.error(NAMESPACE, `Could not authenticate user: ${err}`, req.socket.remoteAddress);
        }
        res.status(401);
        throw new Error('Not authorized');
    }
});


export = protect;