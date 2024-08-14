import { Ticket } from "../models/ticket.model.js"
import { ApiError, ApiResponse } from "../utils/index.js"

const registerTicket = async (req,res,next)=>{
   try {
     const {route,departureTime,arrivalTime,price,busNumber,passengerNo,seatNo,name,age,gender,bookedBy} = req.body
     if ([route,passengerNo,seatNo,name,age,gender].some(field=>field.trim()==="")) {
         throw new ApiError(400,"All fields are required")
     }
     if (!route) {
        throw new ApiError(400,"Route must be selected")
     }
     if (!bookedBy) {
        throw new ApiError(401,"Unauthorized access \nMust login first") 
     }
     const seatAlreadyFilled = await Ticket.findOne({busNumber,route,seatNo})
     if (seatAlreadyFilled) {
        throw new ApiError(400,"Seat is already filled")
     }
     const ticket = await Ticket.create({passengerNo,busNumber,seatNo,name,age,gender,bookedBy,route,departureTime,arrivalTime,price})
     if (!ticket) {
        throw new ApiError(500,"Something went wrong while booking ticket\n Try again later.")
     }
     return res.status(201).send(new ApiResponse(201,ticket,"Ticket booked Successfully"))
   } catch (error) {
    next(error)
   }
}
const registerManyTicket = async (req,res,next)=>{
   try {
     const {ticketData} = req.body
     if (!ticketData) {
         throw new ApiError(400,"Tickets information are required")
     }
    //  console.log(ticketData);
     
     const ticket = await Ticket.insertMany(ticketData)
     if (!ticket) {
        throw new ApiError(500,"Something went wrong while booking ticket\n Try again later.")
     }
     return res.status(201).send(new ApiResponse(201,ticket,"Ticket booked Successfully"))
   } catch (error) {
    next(error)
   }
}
const getTickets = async (req,res,next)=>{
    try {
        const route= req.query.route
        const busNumber= req.query.busNumber
        if (!route || !busNumber) {
            throw new ApiError(400,"Route does not exis")
        }
        const tickets = await Ticket.find({route,busNumber})
        if (tickets.length<=0) {
            res.status(200).send(new ApiResponse(200,[],"Tickets Not Found"))
        }
        return res.status(200).send(new ApiResponse(200,tickets,"Tickets fetched successfully"))
    } catch (error) {
        next(error)
    }
}
const getAllTickets = async (req,res,next)=>{
    try {
        
        const tickets = await Ticket.find({})
        if (tickets.length<=0) {
            res.status(200).send(new ApiResponse(200,[],"Tickets Not Found"))
        }
        return res.status(200).send(new ApiResponse(200,tickets,"Tickets fetched successfully"))
    } catch (error) {
        next(error)
    }
}
const deleteTicket = async(req,res,next)=>{
    try {
        const {ticketId} = req.params
        if (!ticketId) {
            throw new ApiError(400,"Invalid ticket id provided")
        }
        const data = await Ticket.findByIdAndDelete(ticketId)
        if (!data) {
            throw new ApiError(500,"Something went wrong,while deleting ticket"+errorHandler.message)
        }
        return res.status(200).send(new ApiResponse(200,data,"Ticket deleted successfully"))
    } catch (error) {
        next(error)
    }
}
const updateTicket = async(req,res,next)=>{
    try {
        const {ticketId} = req.params
        const {name,busNumber,seatNo,departureTime} = req.body
        if ([name,busNumber,seatNo,departureTime].some((field)=>field.trim()==="")) {
            throw new ApiError(400,"All fields are required")
        }
        if (!ticketId) {
            throw new ApiError(400,"Invalid ticket id provided")
        }
        const data = await Ticket.findByIdAndUpdate(ticketId,{
            $set:{
              name,
              busNumber,
              seatNo,
              departureTime
            }
        },{new:true})
        if (!data) {
            throw new ApiError(500,"Something went wrong,while updating ticket"+errorHandler.message)
        }
        return res.status(200).send(new ApiResponse(200,data,"Ticket updated successfully"))
    } catch (error) {
        next(error)
    }
}
export {registerManyTicket,registerTicket,getTickets,getAllTickets,deleteTicket,updateTicket}