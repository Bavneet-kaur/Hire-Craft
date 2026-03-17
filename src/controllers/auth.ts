import users from "../models/user";
import { Router } from "express";
const router = Router();


/**
 * @name registerUser
 * @description register a new user expects: name, email, password, timezone(automatic)
 * @access {*}
 */
export const registerUser = async (req: any, res: any) => {
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
        const newUser = await users.create({
            name, 
            email, 
            password
        });
        res.status(201).json({
            message: "User created successfully!"
        })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
};

