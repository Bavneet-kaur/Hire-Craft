import express from "express";
import connectDB from "./config/db";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";
import cors from "cors";

connectDB();


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);
app.use("/api/auth", authRouter);
export default app;