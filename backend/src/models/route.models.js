import mongoose from "mongoose";
const routeSchema = new mongoose.Schema({
    departureLocation:{
        type:String,
        required:true
    },
    arrivalLocation:{
        type:String,
        required:true
    },
    busId:{
        type:mongoose.Schema.ObjectId,
        ref:"Bus"
    },
    operatorName:{
        type:String,
        required:true
    },
    departureTime:{
        type:String,
        required:true
    },
    arrivalTime:{
        type:String,
        required:true
    },
    fare:{
        type:String,
        required:true
    },
    availableSeats: {
        type:Number
    },
    bookedSeats: {
        type:[
            {
                 type:mongoose.Schema.ObjectId,
                 ref:"Ticket"
            }
        ]
    },
    date:{
        type:String,
        required:true
    }
},{timestamps:true})
export const Route = mongoose.model("Route",routeSchema)