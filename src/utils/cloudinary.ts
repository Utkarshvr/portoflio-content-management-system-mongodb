import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath: any, name?: string) => {
  try {
    if (!localFilePath) return null;

    // Upload the file on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      public_id: name,
    });

    // File has been uploaded
    console.log("File is uploaded on cloudinary!", response.url);

    // Remove file from local storage
    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    // Remove the locally saved temporary file as the upload operation got failed
    fs.unlinkSync(localFilePath);
    return error;
  }
};
export const deleteMediaFromCloudinary = async (resources: string[]) => {
  try {
    // Upload the file on Cloudinary
    const response = await cloudinary.api.delete_resources(resources);

    // File has been uploaded
    console.log("File is deleted from cloudinary!", response);

    return response;
  } catch (error) {
    // Remove the locally saved temporary file as the upload operation got failed
    console.log(error);
    return error;
  }
};

export const createFolderOnCloudinary = async (folder?: string) => {
  try {
    // Upload the file on Cloudinary
    const response = await cloudinary.api.create_folder(folder);

    // File has been uploaded
    console.log("Folder is created on cloudinary!", response);

    return response;
  } catch (error) {
    return error;
  }
};
