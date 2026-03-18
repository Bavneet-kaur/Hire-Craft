import {Router}  from "express";
import {registerUser, loginUser, logoutUser} from "../controllers/auth"

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

/**
 * @route GET  /api/auth/logoutUser
 * @description clear token from user cookie & add token in blacklist
 * @access {*}
 */
router.post("/logout", logoutUser )

export default router;