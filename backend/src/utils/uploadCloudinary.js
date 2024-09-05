
import { v2 as cloudinary } from "cloudinary";
import fs from "fs" //used for handling a file system by default in node js
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // upload our file to cloudinary 
        // console.log(localFilePath);
        
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // printing a message on successfully uploaded file 
        console.log(`File is uploaded successfully to cloudinary:\n Path of file is: ${response.url}`);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        console.log(error.message);
        
        fs.unlinkSync(localFilePath)// it removes the locally saved temporary file as the upload operation got failed
        return null;
    }
}
// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });
const deleteFromCloudinary = async (fileName) => {
    try {
        if (!fileName) {
            return null
        }
        const response = await cloudinary.api.delete_resources([fileName],
            {
                type: 'upload',
                resource_type: 'image'
            }
        )
        console.log(`File ${fileName} has been removed from cloudinary`)

        if (!response) {
            return null
        }
        return response
    } catch (error) {
        console.error(error);
        return null
    }
}
export { uploadOnCloudinary, deleteFromCloudinary };