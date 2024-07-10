import express from "express"
import { createOrder, processPayment } from "../../controllers/payment/payment-order"
import { authenticateUser } from "../../middlewares/auth"

const paymentRouter=express.Router()

paymentRouter.post("/create-order",createOrder)

paymentRouter.post("/generate-receipt",processPayment)

export {paymentRouter}