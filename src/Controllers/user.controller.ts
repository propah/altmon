import { Request, Response } from 'express';
import logging from "../Config/logging";
import { User, IUser } from "../Models/user.model";
import asyncHandler from 'express-async-handler';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const NAMESPACE = "UserController";

function validateUserInfoFormat(user: IUser): Error | undefined {
    if (!(user.email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email))) {
        return Error("Invalid email");
    }
    if (user.email.length > 50) throw new Error("Email is too long");
    if (!(/^[A-Za-z][A-Za-z0-9_]{3,29}$/).test(user.username)) return Error("Invalid username characters");
    if (user.username.length < 4 || user.username.length > 20) return Error("Invalid username length");
    if (user.password.length < 8 || user.password.length > 50) return Error("Invalid password length");
}

function generateJWT(id: string): String {
    if (!process.env.JWT_SECRET) {
        logging.error(NAMESPACE, "JWT_SECRET is undefined");
        throw new Error("JWT_SECRET is undefined");
    } 
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

// @desc   Register a user
// @route  POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        logging.debug(NAMESPACE, `Registering user ${req.body.username}`, req.socket.remoteAddress);
        const user = new User(req.body);
        const error: Error | undefined = validateUserInfoFormat(user);
        if (error) res.status(400).json({ message: error.message });
        if (await User.findOne({ email: user.email })) {
            res.status(400).json({ message: `Email ${user.email} is already taken` });
        } else if (await User.findOne({ username: user.username })) {
            res.status(400).json({ message: `Username ${user.username} is already taken` });
        } else {
            logging.debug(NAMESPACE, `Registered user ${req.body.username}`, req.socket.remoteAddress);
            user.password = await bcrypt.hash(user.password, 10);
            await user.save();
            res.status(200).json({ username: user.username, email: user.email, token: generateJWT(user._id.toString()) });
        }
    } catch (err: any) {
        if (err instanceof Error) {
            logging.error(NAMESPACE, `Could not register user: ${err}`, req.socket.remoteAddress);
        }
        res.status(400);
        throw new Error("Could not register");
    }
});

// @desc   Authenticate a user
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        if (!(req.body.email && req.body.password)) throw new Error("missing email or password");
        logging.debug(NAMESPACE, `Logging in user ${req.body.email}`, req.socket.remoteAddress);
        const user = await User.findOne({ email: req.body.email });
        if (user && (await bcrypt.compare(req.body.password, user.password))) {
            logging.debug(NAMESPACE, `Logged in user ${req.body.email}`, req.socket.remoteAddress);
            res.status(200).json({username: user.username, email: user.email, token: generateJWT(user._id.toString()) });
        } else {
            logging.debug(NAMESPACE, `Invalid credentials for user ${req.body.email}`, req.socket.remoteAddress);
            res.status(400).json({ message: `Invalid credentials` });
        }
    } catch (err: any) {
        if (err instanceof Error) {
            logging.error(NAMESPACE, `Could not login user: ${err}`, req.socket.remoteAddress);
        }
        res.status(400);
        throw new Error("Could not login");
    }
});

// @desc   Register a user
// @route  POST /api/users/me
// @access Private
const getOwnUserData = asyncHandler(async (req: Request, res: Response) => {
    res.status(200).json(res.locals.user);
});

export {
    registerUser,
    loginUser,
    getOwnUserData
}