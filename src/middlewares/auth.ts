import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import users from "../models/user";
import blacklist from "../models/blacklist.model";

export const authUser = async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies?.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized: Token not provided!",
      });
    }

    const isBlacklisted = await blacklist.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({
        message: "Token is blacklisted. Please login again.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    console.log("Decoded token:", decoded); 

    const user = await users.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;

    next();
  } catch (error: any) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};