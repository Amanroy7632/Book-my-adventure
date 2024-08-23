import mongoose from "mongoose"
import dotenv from "dotenv"
import { app } from "./app.js"
dotenv.config({
    path: "./.env"
})
const connectionUrl = process.env.MONGODB_URL
const connectDB = async () => {
    try {
        // console.log(connectionUrl);
        const connectionInstance = await mongoose.connect(`${connectionUrl}/testDb`)
        console.log(`Database Connected || Hosted: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`FAILED to Connect with MongoDB: ${error}`);
        process.exit(1);
    }
}
connectDB().then((res) => {
    const port = process.env.PORT || 5000
    app.listen(port,()=>{
        console.log(`Server listening on ${port}`);
        console.log(`URL: http://localhost:${port}`);  
    })
}).catch((error) => {
    console.log(`Something went wrong while connecting to MongoDB \n Error: ${error}`);

})