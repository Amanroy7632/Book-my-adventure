import mongoose, { Schema } from "mongoose";
const busSchema = new mongoose.Schema({
    busno:{
        type:String,
        required:true,
        lowercase:true,
        unique:true        
    },
    busname:{
        type:String,
        required:true,
    },
    totalSeat:{
        type:Number,
        required:true
    },
    busType:{
       type:String,
       required:true
    },
    owner:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },
    amenity:[{
        type:String,
    }]
},{timestamps:true})
export const Bus = mongoose.model("Bus",busSchema)
