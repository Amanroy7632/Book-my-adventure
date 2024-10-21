import { Bus, Route } from "../models/index.js"
import { ApiError,ApiResponse } from "../utils/index.js"

const registerRoute = async(req,res,next)=>{
    try {
        console.log("\x1b[33m%s\x1b[0m",`Api Hits for registering route & served by ${process.pid}`)
        const {departureLocation,arrivalLocation,busId,operatorName,departureTime,arrivalTime,fare,date} = req.body
        if ([departureLocation,arrivalLocation,busId,operatorName,departureTime,arrivalTime,fare].some(item=>item?.trim()==="")) {
            throw new ApiError(401,"All fields are required")
        }
        const existingRoute = await Route.find({departureLocation,arrivalLocation,date,busId})
        if (existingRoute.length>0) {
            return res.status(401).send(new ApiResponse(401,{},"Already registerd route"))
        }
        const route = await Route.create({departureLocation,arrivalLocation,busId,operatorName,departureTime,arrivalTime,fare,date})
       
        if (!route) {
            throw new ApiError(500,"Something went wrong while saving data to database")
        }
        res.status(200).send(new ApiResponse(200,route,"Route created successfully"))
    } catch (error) {
        next(error)
    }
}
const updateRoute = async (req,res,next)=>{
    try {
        console.log("\x1b[33m%s\x1b[0m",`Api Hits for updating route & served by ${process.pid}`)
        const {date,arrivalLocation,arrivalTime,departureLocation,departureTime,fare,busId} = req.body
        const {routeId} =req.params
        if (!routeId) {
            throw new ApiError(400,"Route id must be provided")
        }
        const prevRoute = await Route.findById(routeId)
        if (!prevRoute) {
            throw new ApiError(400,"Route not found")
        }
        const route  = await Route.findByIdAndUpdate(routeId,{
            $set:{
                departureLocation:departureLocation?departureLocation:prevRoute.departureLocation,
                arrivalLocation:arrivalLocation?arrivalLocation:prevRoute.arrivalLocation,
                fare:fare?fare:prevRoute.fare,
                date:date?date:prevRoute.date,
                busId:busId?busId:prevRoute.busId,
                departureTime:departureTime?departureTime:prevRoute.departureTime,
                arrivalTime:arrivalTime?arrivalTime:prevRoute.arrivalTime            
            }
        },{
            new:true
        })
        if (!route) {
            throw new ApiError(500,"Something went wrong while updating route. Please try again")
        }
        return res.status(200).send(new ApiResponse(200,route,"Route updated successfully"))
    } catch (error) {
        next(error)
    }
}
const getRoute = async(req,res,next)=>{
    try {
        console.log("\x1b[33m%s\x1b[0m",`Api Hits for retrival of routes & served by ${process.pid}`)
        const {departureLocation,arrivalLocation,date} = req.query
        //  console.log(departureLocation,arrivalLocation);
        //  const routes = await Route.find({departureLocation,arrivalLocation})
        const routes = await Route.aggregate([
            {
                $match: {
                    departureLocation:departureLocation?.toLowerCase(),
                    arrivalLocation:arrivalLocation?.toLowerCase(),
                    date
                }
            },
            {
                $lookup: {
                    from: "buses",
                    localField: "busId",
                    foreignField: "_id",
                    as: "routeBuses"
                }
            },
            
            {
                $unwind: {
                    path: "$routeBuses",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: "$_id",
                    departureLocation: { $first: "$departureLocation" },
                    arrivalLocation: { $first: "$arrivalLocation" },
                    busId: { $first: "$busId" },
                    operatorName: { $first: "$operatorName" },
                    departureTime: { $first: "$departureTime" },
                    arrivalTime: { $first: "$arrivalTime" },
                    fare: { $first: "$fare" },
                    routeBuses: { $first: "$routeBuses" }
                }
            },
            {
                $addFields: {
                    busDetails: {
                        busname: "$routeBuses.busname",
                        busType: "$routeBuses.busType",
                        totalSeat: "$routeBuses.totalSeat",
                        amenity: "$routeBuses.amenity",
                        busno:"$routeBuses.busno"
                    }
                }
            },
            {
                $lookup:{
                    from:"tickets",
                    localField:"_id",
                    foreignField:"route",
                    as:"bookedTicket"
                }
            },
            {
                $addFields:{
                    bookedTicketsCount: { $size: "$bookedTicket" }
                }
            },
            {
                $project: {
                    _id: 1,
                    departureLocation: 1,
                    arrivalLocation: 1,
                    busId: 1,
                    operatorName: 1,
                    departureTime: 1,
                    arrivalTime: 1,
                    fare: 1,
                    busDetails: 1,
                    bookedTicketsCount:1
                }
            }
        ]);
         if (routes.length===0) {
            
             return res.status(200).send(new ApiResponse(404,{},"route not found"))
         }
         return res.status(200).send(new ApiResponse(200,routes,"route fetched successfully"))
    } catch (error) {
        next(error)
    }
}
const getAllRoute = async(req,res,next)=>{
    try {
        console.log("\x1b[33m%s\x1b[0m",`Api Hits for retrival of all routes & served by ${process.pid}`)
        const routes = await Route.aggregate([
            // {
            //     $match: {
            //     }
            // },
            {
                $lookup: {
                    from: "buses",
                    localField: "busId",
                    foreignField: "_id",
                    as: "routeBuses"
                }
            },
            
            {
                $unwind: {
                    path: "$routeBuses",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group: {
                    _id: "$_id",
                    departureLocation: { $first: "$departureLocation" },
                    arrivalLocation: { $first: "$arrivalLocation" },
                    busId: { $first: "$busId" },
                    operatorName: { $first: "$operatorName" },
                    departureTime: { $first: "$departureTime" },
                    arrivalTime: { $first: "$arrivalTime" },
                    fare: { $first: "$fare" },
                    routeBuses: { $first: "$routeBuses" }
                }
            },
            {
                $addFields: {
                    busDetails: {
                        busname: "$routeBuses.busname",
                        busType: "$routeBuses.busType",
                        totalSeat: "$routeBuses.totalSeat",
                        amenity: "$routeBuses.amenity",
                        busno:"$routeBuses.busno"
                    }
                }
            },
            {
                $lookup:{
                    from:"tickets",
                    localField:"_id",
                    foreignField:"route",
                    as:"bookedTicket"
                }
            },
            {
                $addFields:{
                    bookedTicketsCount: { $size: "$bookedTicket" }
                }
            },
            {
                $project: {
                    _id: 1,
                    departureLocation: 1,
                    arrivalLocation: 1,
                    busId: 1,
                    operatorName: 1,
                    departureTime: 1,
                    arrivalTime: 1,
                    fare: 1,
                    busDetails: 1,
                    bookedTicketsCount:1
                }
            }
        ]);
        // console.log(routes.length);
         if (routes.length===0) {
            
             return res.status(200).send(new ApiResponse(404,{},"route not found"))
         }
         
         return res.status(200).send(new ApiResponse(200,routes,"route fetched successfully"))
    } catch (error) {
        next(error)
    }
}
const deleteRoute =async (req,res,next)=>{
    try {
        const {id} = req.params;
        console.log(id);
        
        if (!id) {
            return next(new ApiError(401,"Route id is required"))
        }
        const result = await Route.findByIdAndDelete(id);
        if (!result) {
            return next(new ApiError(404,"Route does not exist"));
        }
        return res.status(200).send(new ApiResponse(200,result,"route deleted successfully"));
    } catch (error) {
        next(error)
    }
}

export {registerRoute,getRoute,updateRoute,getAllRoute,deleteRoute}