import mongoose from "mongoose";
const answerSchema = new mongoose.Schema({
    questionId:{
        type:mongoose.Schema.ObjectId,
        ref:"Question"
    },
    answer:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    }
},{timestamps:true})
export const Answer = mongoose.model("Answer",answerSchema)