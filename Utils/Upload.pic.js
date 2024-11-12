import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET // Click 'View API Keys' above to copy your API secret
});
export const UploadPic = async (localPath) => {
    try {

        if (!localPath) return { message: "file are null => upload failed" };
        const responce = await cloudinary.uploader.upload(localPath, { source_type: "auto" });
        console.log("Picture are uploaded on cloudinary");
        setTimeout(() => {
            fs.unlinkSync(localPath);
        }, 3000);
        return responce;
    } catch (error) {
        fs.unlinkSync(localPath);
    }
}
