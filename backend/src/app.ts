import express from "express";
import connectDB from "./config/db";
import authRouter from "./routes/auth";
import cookieParser from "cookie-parser";
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
export default app;