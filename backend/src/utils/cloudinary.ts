import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "fs";

// Configure Cloudinary with environment variables
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY;
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadOnCloudinary = async (localFilePath: string): Promise<UploadApiResponse | null> => {
  try {
    if (!localFilePath) return null;

    // Upload the file to Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });

    // File uploaded successfully
    console.log("File is uploaded to Cloudinary:", response.url);

    // Delete the locally saved temporary file
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // Handle upload failure
    console.error("Error uploading file to Cloudinary:", error);

    try {
      // Attempt to delete the locally saved temporary file
      fs.unlinkSync(localFilePath);
      console.log("File is deleted successfully");
    } catch (unlinkError) {
      // Handle file deletion error
      console.error(`Error deleting file: ${unlinkError}`);
    }

    return null;
  }
};