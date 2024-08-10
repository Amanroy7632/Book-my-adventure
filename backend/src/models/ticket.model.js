import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    route: {
        type: mongoose.Schema.ObjectId,
        ref: "Route"
    },
    busNumber: {
        type: String,
        required: true
    },
    passengerNo: {
        type: String,
        required: true
    },
    seatNo: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    departureTime: {
        type: String
    },
    arrivalTime: { type: String },
    price: {
        type: String
    },
    bookedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
}, { timestamps: true })
export const Ticket = mongoose.model("Ticket", ticketSchema)