import { app } from "./app.js"
import dotenv from "dotenv"
import connectDB from "./db/index.js"
dotenv.config({
    path:"./.env"
})
connectDB().then(()=>{
    const port = process.env.PORT || 5000
    app.listen(port,()=>{
        console.log(`Server is listning on port: ${port}`)
        console.log(`URL: http://localhost:${port}`)
    })
}).catch((err)=>{
    console.log(`Mongodb connection failed:${err}`)
})