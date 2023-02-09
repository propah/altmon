import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import { User, IUser } from "../Models/user.model";
import { Request, Response, NextFunction } from 'express';
import logging from "../Config/logging";

const NAMESPACE = "AuthMiddleware";


function getDecodedToken(req: Request, res: Response): JwtPayload {
    if (!process.env.JWT_SECRET) {
        logging.error(NAMESPACE, "JWT_SECRET is undefined");
        throw new Error("JWT_SECRET is undefined");
    }
    let token;
    if (!req.headers["x-access-token"]) throw new Error("Not authorized");
    token = req.headers["x-access-token"].toString();
    const decoded: JwtPayload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    return decoded;
}

const protect = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const decoded = getDecodedToken(req, res);
        const user = await User.findById(decoded.id);
        if (!user) throw new Error("User not found");
        res.locals.user = user;
        res.locals.admin = false;
        next();
    } catch (err) {
        if (err instanceof Error) {
            logging.error(NAMESPACE, `Could not authenticate user: ${err}`, req.socket.remoteAddress);
        }
        res.status(401);
        throw new Error('Not authorized');
    }
});

// Auth middleware that restrict the use of the route to admin only
const adminOnly = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user: IUser | null | undefined = res.locals.user;
        if (!user) {
            // If you see this it means the protect middleware is not used and should be
            logging.error(NAMESPACE, "User not found in res.locals, trying to find it in the database");
            const decoded = getDecodedToken(req, res);
            user = await User.findById(decoded.id);
            if (!user) throw new Error("User not found");
        }
        if (user.role !== "admin") {
            res.locals.admin = false;
            res.status(401).json({message: "Not authorized"});
            return;
        }
        res.locals.admin = true;
        next();
    } catch (err) {
        if (err instanceof Error) {
            logging.error(NAMESPACE, `Could not authenticate user: ${err}`, req.socket.remoteAddress);
        }
        res.status(401);
        throw new Error('Not authorized');
    }
});

export {
    protect,
    adminOnly
}