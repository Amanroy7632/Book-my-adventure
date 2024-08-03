import mongoose from "mongoose";
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
      },
      fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
      },
      avatar:{
        type:String,//Cloudinary url
        // required:true,
      },
      password:{
        type:String,
        required:[true,"Password is required"], 
      },
      refreshToken:{
        type:String
      }
},{timestamps:true})
userSchema.pre("save",async function (next){
    if (!this.isModified("password")) {
        return next()
    }
    // this.password = await bcrypt.hash(this.password,this.password)
    // next()
})
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=async function (){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken= async function (){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
    process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
})
}
export const User = mongoose.model("User",userSchema)