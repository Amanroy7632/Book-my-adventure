import {User} from "../models/index.js"
import {ApiError,ApiResponse} from "../utils/index.js"

const registerUser = async(req,res,next)=>{
    try {
        const {username,email,password,fullname} =req.body
        if ([username,email,password,fullname].some(field=>field?.trim()==="")) {
            throw new ApiError(400,"All fields are required")
        }
        // check if user is already exist 
        const existingUser = await User.findOne({
            $or:[{username},{email}]
        })
        if (existingUser) {
            throw new ApiError(409,"User with username or email already exists")
        }
        const user = await User.create({
            username:username?.toLowerCase(),
            avatar:"Not Uploaded yet",
            fullname,
            email,
            password
        })
        const userCreated =await User.findById(user._id).select("-password -refreshToken")
        if (!userCreated) {
            throw new ApiError(500, "Something went wrong while registering user")
        }
        return res.status(201).json(
            new ApiResponse(201,userCreated,"User Registered successfully")
        )
    } catch (error) {
        next(error)
    }
}
export {registerUser}