import jwt from "jsonwebtoken"
import { ApiError } from "../utils/index.js"
import { User } from "../models/user.models.js"
const verifyUserToken = async (req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") || null;
        if (!accessToken) {
            throw new ApiError(401, "Unauthorized access")
        }
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        console.log(decodedToken?.exp);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken -isActive")
        if (!user) {
            throw new ApiError(401, "Invalid access token \n or Expired access token")
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error.message);
        next(error)
    }
} 
const activateUseroken = async (req, res, next) => {
    try {
        const accessToken = req.cookiies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!accessToken) {
            throw new ApiError(401, "Unauthorized access")
        }
        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        console.log(decodedToken?.exp);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken -isActive")
        if (!user) {
            throw new ApiError(401, "Invalid access token \n or Expired access token")
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error.message);
        next(error)
    }
} 
export {activateUseroken}
export default verifyUserToken