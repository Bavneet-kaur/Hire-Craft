import users from "../models/user";
import { Router, Request, Response} from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import strict from "node:assert/strict";

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
        const existingUser = await users.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists!"})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await users.create({
            name, 
            email, 
            password: hashedPassword,
        });

       if(!process.env.JWT_SECRET){
        throw new Error("JWT is not defined!");
       }
        const token = jwt.sign(
            {id: newUser._id, name: newUser.name},
            // process.env.JWT_SECRET as string,
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )
        res.cookie("token", token,{
            httpOnly: true,
            secure:true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60* 1000 // 1day
        });
        res.status(201).json({
            message: "User created successfully!",
            token
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

