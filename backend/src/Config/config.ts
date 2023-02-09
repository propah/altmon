import dotenv from "dotenv";

dotenv.config();

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "127.0.0.1";
const SERVER_PORT = process.env.SERVER_PORT || 8899;
if(!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is undefined");
}
const JWT_SECRET = process.env.JWT_SECREET;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const config = {
  server: SERVER,
  jwt_secret: JWT_SECRET,
};

export default config;
