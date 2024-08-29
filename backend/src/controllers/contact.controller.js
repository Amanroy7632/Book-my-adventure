import { Contact } from "../models/contact.model.js"
import { ApiError, ApiResponse } from "../utils/index.js"

const registerContactForm = async(req,res,next)=>{
    try {
        console.log("➡️  Contact form api hitted")
        
        const {name,email,phone,message} = req.body
        if(!name || !email || !phone || !message){
            throw new ApiError(400,"All fields are required")
        }
        if ([name,email,phone,message].some(field=>field?.trim()==="")) {
            throw new ApiError(400,"All fields are required")
        }
        const newContactForm = await Contact.create({name,email,phone,message})
        if (!newContactForm) {
            throw new ApiError(500,"Couldn't create contact form")
        }
        return res.status(200).send(new ApiResponse(200,newContactForm,"Message sent successfully"))

    } catch (error) {
        next(error)
    }
}
export {registerContactForm}