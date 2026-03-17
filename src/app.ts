import express from "express";
import connectDB from "./config/db";
import authRouter from "./routes/auth";
connectDB();

const app = express();

app.use(express.json());
app.use("/api/auth", authRouter);
export default app;