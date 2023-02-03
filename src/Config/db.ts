import mongoose, { ConnectOptions } from "mongoose";
import { env } from 'process';
import logging from "./logging";

const NAMESPACE = "Database";

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        if (!process.env.DATABASE_URL) {
            throw new Error("No database url provided in .env file");
        }
        const conn = await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
        } as ConnectOptions);
        logging.info(NAMESPACE, `MongoDB connected to ${conn.connection.host}`);
    } catch (error) {
        let message = `Unknown error connecting to database`;
        if (error instanceof Error) {
            message = error.message;
        }
        logging.error(NAMESPACE, message);
        process.exit(1);
    }
} 

export = connectDB;