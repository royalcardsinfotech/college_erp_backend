import mongoose,{Document,Schema} from "mongoose";

interface Payment extends Document{
    receiptUrl:String;
    schoolId:String;
    userId:String;
    receiptId:String;
    paymentId:String;
    orderId:String;
    amount: Number
}

const paymentSch:Schema<Payment>=new Schema({
    receiptUrl:String,
    schoolId:{type:String,ref:"school"},
    userId:{type:String,ref:"school"},
    receiptId:String,
    paymentId:String,
    orderId:String,
    amount: Number
})

export const PaymentModel=mongoose.model("payment",paymentSch)