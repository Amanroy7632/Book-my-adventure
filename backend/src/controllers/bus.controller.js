import { Bus } from "../models/index.js";
import { ApiError, ApiResponse } from "../utils/index.js";

const registerBus = async (req,res,next)=>{
  try {
    const {busname,busno,owner,busType,totalSeat,wifi,waterBottle,chargingPorts,movie,blanket} = req.body;
    if ([busname,busno,owner,busType].some(item=>item?.trim()==="")) {
        throw new ApiError(401,"All Fields are required")
    }
    if(!totalSeat){
        throw new ApiError(401,"Total seat number is required.")
    }
    if (!owner) {
       throw new ApiError(401,"Owner information must be required") 
    }
    const alreadyRegisteredBus = await Bus.findOne({busno})
    if (alreadyRegisteredBus) {
        return res.status(401).send(new ApiResponse(401,{},"Bus Number is already registered"))
    }
    const newBus = await Bus.create({busname,busno,owner,totalSeat,busType,amenity:[wifi,waterBottle,chargingPorts,movie,blanket]})
    return res.status(201).send(new ApiResponse(201,newBus,"Bus registered Successfully"))
  } catch (error) {
    next(error)
  }
}
const getBus =async (req,res,next)=>{
    try {
        const {id} = req.params
        if (!id) {
            throw new ApiError(400,"Bus number is required")
        }
        const bus = await Bus.findOne({_id:id})
        if (!bus) {
            return res.status(200).send(new ApiResponse(404,{},"Bus not found"))
        }
        return res.status(200).send(new ApiResponse(200,bus,"Bus found"))
    } catch (error) {
        next(error)
    }
}
const getBusId =async (req,res,next)=>{
    try {
        const bus = await Bus.find({}).select("-busType -owner -amenity -totalSeat -createdAt -updatedAt -__v")
        return res.status(200).send(new ApiResponse(200,bus,"Bus data fetched"))
    } catch (error) {
        next(error)
    }
}
const getAllBus = async (req,res,next)=>{
    try {
        const buses = await Bus.find({}).select("-owner -createdAt -updatedAt -__v")
        console.log(buses.length);
        
        if (buses.length<=0) {
            return res.status(404).send(new ApiResponse(404,{},"Bus not found"))
        }
        return res.status(200).send(new ApiResponse(200,buses,"Bus data fetched successfully"))
    } catch (error) {
        next(error)
    }
}
export {registerBus,getBus,getBusId,getAllBus}