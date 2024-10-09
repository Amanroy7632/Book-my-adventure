import { ApiError } from "./ApiError.js"
const errorHandler = (error,req,res,next)=>{
    const code =error.statusCode?error.statusCode:500
    if (res.headersSent) {
        // If headers are already sent, delegate to the default error handler
        return res.status(500).json(new ApiError(500,"Header not seated."))  // Delegate to default error handler if response already sent
        // return next(error);
    }
    
     return res.status(code).send(new ApiError(code,`${error.message}`,error.stack))
}
export {errorHandler}