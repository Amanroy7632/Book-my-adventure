import mongoose from "mongoose"

const db_name= process.env.DB_NAME

const connectionUrl =`${process.env.MONGODB_URL}/${db_name}`

const connectDB = async()=>{
    try {
        // console.log(connectionUrl);
        const connectionInstance = await mongoose.connect("mongodb+srv://yadavaman7632:Aman7632@cluster0.atongtk.mongodb.net/busbook")
        return connectionInstance
    } catch (error) {
        console.log(`FAILED to Connect with MongoDB: ${error}`);
        process.exit(1);
        return null
    }
}
export default connectDB