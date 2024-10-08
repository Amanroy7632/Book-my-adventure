import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    razorpay_order_id:{
        type:String,
        required:true,
        unique:true
    },
    razorpay_payment_id:{
        type:String,
        required:true
    },
    razorpay_signature:{
        type:String,
        required:true
    },
    paymentBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }

}, { timestamps: true })
export const Payment = mongoose.model("Payment",paymentSchema);