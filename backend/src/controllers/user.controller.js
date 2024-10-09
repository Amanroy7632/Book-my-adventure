import { hash } from "bcrypt";
import { sendMail } from "../config/mail.js";
import { User } from "../models/index.js"
import { generateOTP } from "../utils/generateOtp.js";
import { ApiError, ApiResponse } from "../utils/index.js"
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/uploadCloudinary.js";
import jwt from "jsonwebtoken";
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
    console.log("\x1b[33m%s\x1b[0m", `Api Hits for retrival of Current user & served by ${process.pid}`)
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
        if (phone?.length !== 10) {
            throw new ApiError(403, "Invalid phone number")
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
        console.log("\x1b[33m%s\x1b[0m", `Api Hits for Sign in by ${email} & served by ${process.pid}`)
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
        // console.log(accessToken, refreshToken);

        const loginUser = await User.findById(user._id).select("-password -refreshToken")
        const cookieOptions = {
            httpOnly: true,
            secure: true
        }
        res.cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 3600000 }); // 1 hour expiration
        res.cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 10 * 24 * 60 * 60 * 1000 }); // 7 days expiration
        return res.status(200).json(new ApiResponse(200, { user: loginUser, accessToken, refreshToken }, "User logged in succesfully"))


    } catch (error) {
        next(error)
    }
}
const logoutUser = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return next(new ApiError(400, "User not logged in"));
        }
        await User.findByIdAndUpdate(user?._id, {
            $set: {
                refreshToken: undefined
            }
        }, { new: true });
        const options = { httpOnly: true, secure: true }
        return res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).json(new ApiResponse(200, {}, "user logged out"))
    } catch (error) {
        next(error);
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
const uploadAvatar = async (req, res, next) => {
    try {
        console.log("\x1b[33m%s\x1b[0m", `Api Hits for updating avtar & served by ${process.pid}`)
        const user = req.user
        if (!user) {
            throw new ApiError(400, "Unauthorize access")
        }
        const avatarLocalPath = req.file?.path
        // console.log(avatarLocalPath);

        if (!avatarLocalPath) {
            throw new ApiError(401, "Invalid avatar path")
        }
        const avatarResponse = await uploadOnCloudinary(avatarLocalPath)
        if (!avatarResponse) {
            throw new ApiError(500, "Something went wrong while uploading avatar to cloudinary")
        }
        user.avatar = avatarResponse?.url
        await user.save()
        return res.status(200).json(new ApiResponse(200, user, "Avatar updated successfully"))
    } catch (error) {
        next(error)
    }
}
const removeAvatar = async (req, res, next) => {
    try {
        console.log("\x1b[33m%s\x1b[0m", `Api Hits for removing avtar & served by ${process.pid}`)
        const user = req.user
        if (!user) {
            throw new ApiError(401, "Unauthorized access")
        }
        const imgName = user?.avatar?.split("/")[7]?.split(".")[0]
        // console.log(imgName);

        if (!imgName) {
            throw new ApiError(400, "Image url is not found")
        }
        const response = await deleteFromCloudinary(imgName)
        if (!response) {
            throw new ApiError(500, "Something went wrong while removing the avatar from the cloudinary")
        }
        user.avatar = "https://via.placeholder.com/150"
        await user.save()
        return res.status(200).send(new ApiResponse(200, { user, response }, "Avtar removed successfully"))
    } catch (error) {
        next(error)
    }
}
const getAllUsers = async (req, res, next) => {
    try {
        console.log("\x1b[33m%s\x1b[0m", `Api Hits for retrival of all users & served by ${process.pid}`)
        const users = await User.find({}).select("-password -verificationCode -forgetPasswordCode -lastOtpGenerationTime -refreshToken -__v")
        return res.status(200).send(new ApiResponse(200, users, "All users data fetched successfully"))
    } catch (error) {
        next(error)
    }
}
const refreshUser = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    try {
        if (!refreshToken) return res.sendStatus(401).json(new ApiError(401, "Invalid refresh token")); // No refresh token in cookie

        const user = await User.findOne({ refreshToken }).select("-createdAt -updatedAt -password -refreshToken -isActive -__v -businessName -state -city -isAdmin");
        console.log(user);


        if (!user) {
            // console.log(process.env.NODE_ENV === 'production');
            return res.sendStatus(403); // Refresh token is invalid
        }
        // const decryptedRefreshToken = decrypt(refreshToken);
        // console.log(decryptedRefreshToken);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) return res.sendStatus(403); // Invalid refresh token
            // console.log(user);

            // Generate a new access token
            const newAccessToken = await jwt.sign(
                {
                    _id: this._id,
                    email: this.email,
                    phone: this.phone,
                    fullname: this.fullname
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
                }
            )

            const cookieOptions = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // Secure in production
                sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Strict', // SameSite policy for production
            };

            return res.cookie("accessToken", newAccessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 }).json({ accessToken: newAccessToken });
        });
    } catch (error) {
        next(error);
    }

}
export {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    forgetPasswordOtpGeneration,
    resetPassword,
    uploadAvatar,
    removeAvatar,
    getAllUsers,
    refreshUser
}