import mongoose from "mongoose"
const db_name= process.env.DB_NAME
const connectionUrl =`${process.env.MONGODB_URL}/${db_name}`
const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(connectionUrl)
        console.log(`Database Connected || Hosted: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`FAILED to Connect with MongoDB: ${error}`);
        process.exit(1);
    }
}
export default connectDB