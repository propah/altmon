import { Request, Response } from 'express';
import logging from "../Config/logging";
import { User, IUser } from "../Models/user.model";
import asyncHandler from 'express-async-handler';
import { Jwt } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const NAMESPACE = "UserController";

function validateUserInfo(user: IUser) {
    if (!(user.email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.email))) {
        throw new Error("Invalid email");
    }
    if (user.email.length > 50) throw new Error("Email is too long");
    if (!(/^[A-Za-z][A-Za-z0-9_]{3,29}$/).test(user.username)) throw new Error("Invalid username characters");
    if (user.username.length < 5 || user.username.length > 20) throw new Error("Invalid username length");
    if (user.password.length < 8 || user.password.length > 50) throw new Error("Invalid password length");
}

// @desc   Register a user
// @route  POST /api/users/register
// @access Public
const registerUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        logging.debug(NAMESPACE, `Registering user ${req.body.username}`, req.socket.remoteAddress);
        const user = new User(req.body);
        validateUserInfo(user);
        if (await User.findOne({ email: user.email })) {
            res.status(400).json({ message: `Email ${user.email} is already taken` });
            return;
        }
        if (await User.findOne({ username: user.username })) {
            res.status(400).json({ message: `Username ${user.username} is already taken` });
            return;
        }
        await user.save();
        user.password = await bcrypt.hash(user.password, 10);
        logging.debug(NAMESPACE, `Registered user ${req.body.username}`, req.socket.remoteAddress);
        res.status(200).json({username: user.username, email: user.email});
    } catch (err: any) {
        res.status(400);
        if (err instanceof Error) {
            logging.error(NAMESPACE, `Could not register user, invalid request: ${err}`, req.socket.remoteAddress);
        }
        res.status(400).json({ message: `Could not register user, invalid request` });
    }
});

// @desc   Authenticate a user
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req: Request, res: Response) => {
    try {

    } catch (err: any) {
        res.status(400);
        if (err instanceof Error) {
            logging.error(NAMESPACE, `Could not login user, invalid request: ${err}`, req.socket.remoteAddress);
        }
        res.status(400).json({ message: `Could not login user, invalid request` });
    }
});

// @desc   Register a user
// @route  POST /api/users/me
// @access Public
const getOwnUserData = asyncHandler(async (req: Request, res: Response) => {
    res.send(req);
});

export {
    registerUser,
    loginUser,
    getOwnUserData
}