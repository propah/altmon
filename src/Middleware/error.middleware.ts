import { Request, Response, NextFunction } from 'express';
import logging from '../Config/logging';
const NAMESPACE = 'ErrorMiddleware';
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const status_code = res.statusCode ? 500 : res.statusCode;
    res.status(status_code).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
    });
}

export = errorHandler