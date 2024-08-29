import { Bus, Route,User } from "../models/index.js"
import { Ticket } from "../models/ticket.model.js";
import { ApiResponse } from "../utils/index.js"

const getAllInformation = async (req, res, next) => {
    try {
       const buses = await Bus.countDocuments();
       const trips = await Route.countDocuments();
       const users = await User.countDocuments();
       const totalbookings = await Ticket.countDocuments()
       return res.status(200).send(new ApiResponse(200,{buses,trips,users,totalbookings},"All data fetched successfully"))
    } catch (error) {
        next(error)
    }
}
export { getAllInformation }