import dotenv from "dotenv";

dotenv.config();

export const {
  PORT = 3000, NODE_ENV, MONGODB_URL, MONGODB_USER, MONGODB_PW, JWT_SECRET,
} = process.env;
