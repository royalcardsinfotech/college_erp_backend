import express, { NextFunction, Request, Response } from 'express'
import { authrouter } from './auth/auth'

import { authenticateUser } from '../middlewares/auth'
import { adminActionRouter } from './admin'
import { stuRouter } from './student'
import { schoolRouter } from './school'
import { formSubRouter } from './forms'
import { AuthGuard } from '../middlewares/authguard'
import { createResponse } from '../utils/response-handler'
import { CustomRequest } from '../utils/customrequest'
import { getUserData } from '../controllers/student'
import { paymentRouter } from './payment/index'
import { getErpConfig } from '../controllers/data'

const router=express.Router()


router.use("/auth",authrouter)

// router.use("/formfields",authenticateUser(true),formRouter)

router.use("/admin",adminActionRouter)

router.use("/student",stuRouter)

router.use("/school",schoolRouter)

router.use("/forms",formSubRouter)

router.use("/payment",paymentRouter)

router.post("/isTokenValid",authenticateUser(false),async(req:CustomRequest,res:Response,next:NextFunction)=>{
    return res.status(200).json(createResponse("success",{}))
})


router.get("/erpconfig",authenticateUser(false),getErpConfig)

export {router}