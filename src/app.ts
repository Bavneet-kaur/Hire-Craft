import express from "express";
import connectDB from "./config/db";

connectDB();

const app = express();

app.use(express.json());

export default app;