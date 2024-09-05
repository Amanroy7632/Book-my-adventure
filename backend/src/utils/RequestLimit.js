import {rateLimit} from "express-rate-limit"

const requestLimiter = rateLimit({
    windowMs:15*60*1000,
    limit:100,
    standardHeaders:'draft-7',
    legacyHeaders:false,
    message:{
        message:"Request limit exceeded. We have received too many requests from this IP. Please try after 15 minutes.",
        totalRequest:100,
        duration:'15 minutes',
    },
    statusCode:429,
    handler:(req,res,next,options)=>{
        console.log(`Request Comming from ${req.headers.location}`)
        
        res.status(options.statusCode).json({
            error:options.message,
            limit:options.limit,
            remaining:req.rateLimit.remaining,
            resetTime:new Date(req.rateLimit.resetTime).toLocaleTimeString()
        })
    }
})
const authLimit = rateLimit({
    windowMs:15*60*1000,
    limit:100,
    standardHeaders:'draft-7',
    legacyHeaders:false,
    message:{
        message:"Request limit exceeded. We have received too many requests from this IP. Please try after 15 minutes.",
        totalRequest:100,
        duration:'15 minutes',
    },
    statusCode:429

})

export  {requestLimiter,authLimit}