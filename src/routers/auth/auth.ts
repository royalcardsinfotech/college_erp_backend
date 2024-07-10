import express from "express";
import { getPasswordPortal, googlelogin, login, logout, register, sendOtp, sendPassowrdResetLink, updatePassword, verifyUser } from "../../controllers/auth/auth";
import { adminlogin } from "../../controllers/auth/adminAuth";
import { AuthGuard } from "../../middlewares/authguard";
import { authenticateUser } from "../../middlewares/auth";

const authrouter=express.Router()

authrouter.post("/login", login)
authrouter.post("/logout",authenticateUser(false), logout)

authrouter.post("/signUp",register)
authrouter.post("/googleSignIn",googlelogin)

authrouter.post("/verify",verifyUser)
authrouter.post("/send-otp/:email",sendOtp)


authrouter.post("/admin/login",adminlogin)


authrouter.post("/sendPassword-mail",sendPassowrdResetLink)


export {authrouter}