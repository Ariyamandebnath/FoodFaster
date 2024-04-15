import { v2 as cloudinary} from "cloudinary";
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath: string): Promise<any> => {
    try {
        if (!localFilePath) return null;

        // Upload the file on Cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });

        // File has been uploaded successfully
        console.log("File is uploaded to Cloudinary:", response.url);

        // Remove the locally saved temporary file
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error: any) {
        // Remove the locally saved temporary file as the upload operation failed
        try {
            fs.unlinkSync(localFilePath);
            console.log(`File deleted successfully`);
        } catch (err) {
            console.log(`Error deleting file: ${err}`);
        }
        return null;
    }
};


export {uploadOnCloudinary}