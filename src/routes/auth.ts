import {Router}  from "express";
import {registerUser, loginUser} from "../controllers/auth"

/**
 * * we can use 'Router()' function in this way
import express from "express";
const router = express.Router();
*/

const router = Router();
/**
 * @route POST  /api/auth/registerUser
 * @description register a user
 * @access {*}
 */
router.post("/register", registerUser)
/**
 * @route POST  /api/auth/loginUser
 * @description login user using email & password
 * @access {*}
 */
router.post("/login", loginUser)

export default router;