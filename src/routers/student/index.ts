import express from "express"
import { authenticateUser } from "../../middlewares/auth"
import { getUserData, updateCred } from "../../controllers/student"

const stuRouter=express.Router()

stuRouter.get("/update",authenticateUser(false),updateCred)
stuRouter.get("/",authenticateUser(false),getUserData('students'))
export {stuRouter}