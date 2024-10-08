import { instance } from "../app.js";
import { Payment } from "../models/payemt.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import crypto from "crypto";
const createOrder = async (req, res, next) => {
    try {
        const {amount,currency} = req.body;
        const options = {
            amount: amount*100,
            currency: currency||"INR"
        }
        const order = await instance.orders.create(options);
        // console.log(order);
        return res.status(201).json(new ApiResponse(201, order, "Order created successfully"))
    } catch (error) {
        next(error);
    }
}
const paymentVerification = async (req, res, next) => {
    const user = req.user;
    try {
        if (!user) {
            return next(new ApiError(403,"User is not logged in"));
        }
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET_KEY)
                                        .update(body.toString())
                                        .digest('hex');
        const isAuthenticatedPayment = expectedSignature===razorpay_signature;
        if (isAuthenticatedPayment) {
            //save to the database
            const newPayment = await Payment.create({razorpay_order_id,razorpay_payment_id,razorpay_signature,paymentBy:user._id});
            if (!newPayment) {
                return next(new ApiError(500,"Something went wrong while storing the payment details"));
            }

            return res.redirect('http://localhost:5173/payment/successful');
        }else{
           return next(new ApiError(400,"Payment verification failed")); 
        }                             
        
    } catch (error) {
        next(error);
    }
}
const getKey = async (req, res, next) => {
    try {
        const key = process.env.RAZORPAY_SECRET_KEY;
        return res.status(200).json({ key })
    } catch (error) {
        next(error);
    }
}
export { createOrder, paymentVerification, getKey }