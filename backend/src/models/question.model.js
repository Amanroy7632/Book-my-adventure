import mongoose from "mongoose";
const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }
},{timestamps:true})
export const Question = mongoose.model("Question",questionSchema)