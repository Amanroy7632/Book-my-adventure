import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    username:{
        type:String,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default:0
    },
    route:{
        type:mongoose.Schema.ObjectId,
        ref:"Route"
    }
},{timestamps:true})
export const Feedback = mongoose.model("Feedback",feedbackSchema)