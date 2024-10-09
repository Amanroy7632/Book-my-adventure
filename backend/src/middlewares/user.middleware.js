import { User } from "../models/index.js"
import {ApiError} from "../utils/index.js"
import jwt from "jsonwebtoken"
const verifyToken = async (req,res,next)=>{
    try {
        const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "") || null;
        if (!accessToken) {
            console.log(`Access Token: ${accessToken}`);
            
            throw new ApiError(401,"Access token expired.")
        }
        const decodedToken = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET)
        if (decodedToken?.exp) {
            const currentTime = Math.floor(Date.now() / 1000);
            if (decodedToken.exp<currentTime) {
                return next(new ApiError(401,"Access Token is Expired "))
            }
        }
        // console.log(decodedToken?.exp);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        // console.log(user);
        
        if (!user) {
            throw new ApiError(401,"Invalid access token or Expired access token")
        }
        req.user=user
        next()
    } catch (error) {
        // console.log(error);
        
        console.log(error.message);
        next(error)
        // throw new ApiError(401,"Invalid access token")
    }
}

export default verifyToken