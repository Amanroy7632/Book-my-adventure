import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import uniqueValidator from "mongoose-unique-validator"
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
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
      phone:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function (v){
                return /^\d{10}$/.test(v);
            },
            message:"Invalid phone number"
        }
      },
      avatar:{
        type:String,//Cloudinary url
        default:"https://via.placeholder.com/150"
        // required:true,
      },
      password:{
        type:String,
        required:[true,"Password is required"], 
      },
      isVerified:{
        type:Boolean,
        default:false
      },
      verificationCode:{
        type:String
      },
      forgetPasswordCode:{
        type:String
      },
      lastOtpGenerationTime:{
        type:Date
      },
      refreshToken:{
        type:String
      }
},{timestamps:true})
userSchema.plugin(uniqueValidator)
userSchema.pre("save",async function (next){
    if (!this.isModified("password")) {
        return next()
    }
    this.password = await bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=async function (){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            phone:this.phone,
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
            phone:this.phone,
            fullname:this.fullname
        },
    process.env.REFRESH_TOKEN_SECRET,
{
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
})
}

export const User = mongoose.model("User",userSchema)
// Ensure indexes are synchronized
User.syncIndexes()
.then(() => {
    // console.log("Indexes synchronized");
})
.catch((err) => {
    console.error("Error synchronizing indexes", err);
});

