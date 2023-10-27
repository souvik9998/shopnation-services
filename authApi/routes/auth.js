import express from "express";
import { register, updateUser } from "../controllers/auth.js";
import { login } from "../controllers/auth.js";
import { isAuthorized } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";
import { forgotPassword } from "../controllers/auth.js";
import { verifyOTP } from "../controllers/auth.js";
import { createNewPassword } from "../controllers/auth.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/isUserAuth",verifyToken,isAuthorized);
router.put("/updateUser/:userId",updateUser);
router.post('/forgotPassword',forgotPassword);
router.post('/verifyOTP',verifyOTP);
router.post('/createNewPassword',createNewPassword);
export default router;