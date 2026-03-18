import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Router, Request, Response } from "express";
import users from "../models/user";
import blacklist from "../models/blacklist.model";

const router = Router();

/**
 * @name registerUser
 * @description register a new user expects: name, email, password, timezone(automatic)
 * @access {*}
 */
export const registerUser = async (req: Request, res: Response) => {
    // console.log('register user');
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await users.create({
            name,
            email,
            password: hashedPassword,
        });

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT is not defined!");
        }
        const token = jwt.sign(
            { id: newUser._id, name: newUser.name },
            // process.env.JWT_SECRET as string,
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000 // 1day
        });
        res.status(201).json({
            message: "User created successfully!",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
            // token
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


/**
 * @name loginUser
 * @description login created/register user expects: email and password
 * @access {*} 
 */
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const createdUser = await users.findOne({ email });
        if (!createdUser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const isMatched = await bcrypt.compare(password, createdUser.password)
        if (!isMatched) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const token = jwt.sign(
            { id: createdUser._id, name: createdUser.name },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        )
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000 // 1day
        });
        res.json({
            message: "User logged in  successfully!",
            user: {
                id: createdUser._id,
                name: createdUser.name,
                email: createdUser.email,
            },
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};


/**
 * @name logoutUser
 * @description  expects the token from cookie
 * @access {*} 
 */
export const logoutUser = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(400).json({message: "No token found!"});
        }
        const decoded: any = jwt.decode(token);
        await blacklist.create({
            token,
            expiresAt: new Date(decoded.exp * 1000),
        });
        res.clearCookie("token");
        res.status(200).json({message: "Logged out successfully"});
    }
    catch (error: any) {
        res.status(500).json({message: error.message});
    }
}