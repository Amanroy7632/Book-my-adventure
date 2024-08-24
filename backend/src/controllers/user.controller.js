import { hash } from "bcrypt";
import { sendMail } from "../config/mail.js";
import { User } from "../models/index.js"
import { generateOTP } from "../utils/generateOtp.js";
import { ApiError, ApiResponse } from "../utils/index.js"
import { uploadOnCloudinary } from "../utils/uploadCloudinary.js";
const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken()
        const refreshToken = await user.generateRefreshToken()
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })
        // console.log(accessToken,refreshToken,x);

        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating access token")
    }
}
const getUserProfile = async (req, res, next) => {
    try {
        const user = req.user
        if (!user) {
            throw new ApiError(404, "User not found ")
        }
        return res.status(200).send(new ApiResponse(200, user, "User data fetched successfully"))
    } catch (error) {
        next(error)
    }
}
const registerUser = async (req, res, next) => {
    try {
        const { email, password, fullname, phone } = req.body
        if ([email, password, fullname, phone].some(field => field?.trim() === "")) {
            throw new ApiError(400, "All fields are required")
        }
        // check if user is already exist 
        const existingUser = await User.findOne({
            $or: [{ phone }, { email }]
        })
        if (existingUser) {
            throw new ApiError(409, "User with username or email already exists")
        }
        const user = await User.create({
            avatar: "Not Uploaded yet",
            fullname,
            email: email.toLowerCase(),
            password,
            phone
        })
        const userCreated = await User.findById(user._id).select("-password -refreshToken")
        if (!userCreated) {
            throw new ApiError(500, "Something went wrong while registering user")
        }
        return res.status(201).json(
            new ApiResponse(201, { user: userCreated }, "User Registered successfully")
        )
    } catch (error) {
        next(error)
    }
}
const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email) {
            throw new ApiError(400, "Invalid Email Address")
        }
        if (!password) {
            throw new ApiError(400, "Invalid password.")
        }
        const user = await User.findOne({ email })
        // console.log(user);

        if (!user) {
            throw new ApiError(404, "User does not exist.")
        }
        const isPasswordValid = await user.isPasswordCorrect(password)
        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid password")
        }
        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id)
        console.log(accessToken, refreshToken);

        const loginUser = await User.findById(user._id).select("-password -refreshToken")
        const options = {
            httpOnly: true,
            secure: true
        }
        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(new ApiResponse(200, { user: loginUser, accessToken, refreshToken }, "User logged in succesfully"))


    } catch (error) {
        next(error)
    }
}
const forgetPasswordOtpGeneration = async (req, res, next) => {
    try {
        const { email } = req.body
        if (!email) {
            throw new ApiError(400, "Email is required")
        }
        const user = await User.findOne({ email })
        if (!user) {
            throw new ApiError(404, "User not found\nInvalid email address")
        }
        const otp = generateOTP(6)
        const templateData = {
            username: user?.fullname,
            email,
            phone: user?.phone,
            otp
        }
        await sendMail(email, "Forgot Password", templateData)
        user.forgetPasswordCode = otp
        await user.save()
        return res.status(200).send(new ApiResponse(200, {}, "Otp sent successfully.\nCheck your mail box"))
    } catch (error) {
        next(error)
    }
}
const resetPassword = async (req, res, next) => {
    try {
        const { code, email, newPassword } = req.body
        if (!email) {
            throw new ApiError(400, "Email is required")
        }
        if (!code) {
            throw new ApiError(400, "Invalid code")
        }
        const user = await User.findOne({ email }).select("-password")
        if (!user) {
            throw new ApiError(404, `User with ${email} doesn't exists.`)
        }
        if (code !== user.forgetPasswordCode) {
            throw new ApiError(409, "Invalid verification code")
        }
        // const password = await hash(newPassword, 10)
        user.password = newPassword
        user.verificationCode = null
        user.forgetPasswordCode = null
        await user.save()
        res.status(200).send(new ApiResponse(200, user, "Password updated successfully"))

    } catch (error) {
        next(error)
    }
}
const uploadAvatar =async (req,res,next)=>{
    try {
        const user = req.user
        if (!user) {
            throw new ApiError(400,"Unauthorize access")
        }
        const avatarLocalPath = req.file?.path
        console.log(avatarLocalPath);
        
        if (!avatarLocalPath) {
            throw new ApiError(401,"Invalid avatar path")
        }
        const avatarResponse = await uploadOnCloudinary(avatarLocalPath)
        if (!avatarResponse) {
            throw new ApiError(500,"Something went wrong while uploading avatar to cloudinary")
        }
        user.avatar = avatarResponse?.url 
        await user.save()
        return res.status(200).json(new ApiResponse(200,user,"Avatar updated successfully"))
    } catch (error) {
        next(error)
    }
}
export { registerUser, loginUser, getUserProfile, forgetPasswordOtpGeneration, resetPassword,uploadAvatar }