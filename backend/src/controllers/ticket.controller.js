import { Ticket } from "../models/ticket.model.js"
import { ApiError, ApiResponse } from "../utils/index.js"
import mongoose from "mongoose"
const registerTicket = async (req,res,next)=>{
   try {
    console.log("\x1b[33m%s\x1b[0m",`Api Hits for registering tickets & served by ${process.pid}`)
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
    console.log("\x1b[33m%s\x1b[0m",`Api Hits for registering multiple tickets & served by ${process.pid}`)
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
      console.log("\x1b[33m%s\x1b[0m",`Api Hits for retrival of tickets by route & busno & served by ${process.pid}`)
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
      console.log("\x1b[33m%s\x1b[0m",`Api Hits for retrivsl of all tickets & served by ${process.pid}`)
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
      console.log("\x1b[33m%s\x1b[0m",`Api Hits for deleting tickets & served by ${process.pid}`)
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
      console.log("\x1b[33m%s\x1b[0m",`Api Hits for updating tickets & served by ${process.pid}`)
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
// const getCurrentUserTickets = async (req,res,next)=>{
//     try {
//      const {userId} = req.params   
//      if (!userId) {
//         throw new ApiError(401,"User must be logged in")
//      }
//      const userObjectId = new mongoose.Types.ObjectId(userId);
//      const tickets = await Ticket.aggregate([
//         {
//             $match:{
//                 bookedBy:userObjectId
//             }
//         },
//         {
//             $lookup:{
//                 from:"routes",
//                 localField:"route",
//                 foreignField:"_id",
//                 as:"path"
//             }
//         }
//      ])
//      console.log(tickets.length);
     
//      if (tickets.length<=0) {
//         return res.status(200).send(new ApiResponse(200,{},"User doesn;'t have any trips"))
//      }
//      return res.status(200).send(new ApiResponse(200,tickets,"All trips fetched successfully"))
//     } catch (error) {
//         next(error)
//     }
// }
const getCurrentUserTickets = async (req, res, next) => {
    try {
        // console.log(`Api Hit for retrival of Trips`);
        console.log("\x1b[33m%s\x1b[0m",`Api Hits for retrival of tickets & served by ${process.pid}`)
        
      const { userId } = req.params;
      
      if (!userId) {
        throw new ApiError(401, "User must be logged in");
      }
  
      const userObjectId = new mongoose.Types.ObjectId(userId);
  
      const tickets = await Ticket.aggregate([
        {
          $match: {
            bookedBy: userObjectId,
          },
        },
        {
          $lookup: {
            from: "routes",
            localField: "route",    // Field in Ticket collection
            foreignField: "_id",    // Field in routes collection
            as: "path",
          },
        },
        {
            $addFields:{
                from:{$first:"$path.departureLocation"},
                to:{$first:"$path.arrivalLocation"},
                date:{$first:"$path.date"},
                operatorName:{$first:"$path.operatorName"}
            }
        },
        {
            $project:{
                _id:1,
                busNumber:1,
                passengerNo:1,
                seatNo:1,
                name:1,
                age:1,
                gender:1,
                departureTime:1,
                arrivalTime:1,
                price:1,
                from:1,
                to:1,
                date:1,
                operatorName:1,

            }
        }
      ]);
  
    //   console.log(tickets.length);
  
      if (tickets.length <= 0) {
        return res.status(200).send(new ApiResponse(200, {}, "User doesn't have any trips"));
      }
  
      return res.status(200).send(new ApiResponse(200, {tickets,totalTickets:tickets.length}, "All trips fetched successfully"));
    } catch (error) {
      next(error);
    }
  };
export {registerManyTicket,registerTicket,getTickets,getAllTickets,deleteTicket,updateTicket,getCurrentUserTickets}