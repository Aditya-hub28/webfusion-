import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import { ApiError } from "./ApiError.js"
import dotenv from 'dotenv'

dotenv.config(
    {
        path: '\.env'
    }

)

import path from 'path';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;

        // Check if Cloudinary credentials are fully configured
        const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET;

        if (isCloudinaryConfigured) {
            try {
                const response = await cloudinary.uploader.upload(localFilePath, {
                    resource_type: 'auto'
                });
                if (fs.existsSync(localFilePath)) {
                    fs.unlinkSync(localFilePath);
                }
                return response;
            } catch (err) {
                console.warn("Cloudinary upload failed, falling back to local storage:", err.message);
            }
        }

        // Fallback: serve locally via static file server
        const filename = path.basename(localFilePath);
        const serverPort = process.env.PORT || 8000;
        const localUrl = `http://localhost:${serverPort}/temp/${filename}`;

        return {
            url: localUrl,
            secure_url: localUrl,
            public_id: filename,
            isLocal: true
        };

    } catch (error) {
        console.error("Upload handler error:", error);
        const filename = path.basename(localFilePath);
        const serverPort = process.env.PORT || 8000;
        return {
            url: `http://localhost:${serverPort}/temp/${filename}`,
            secure_url: `http://localhost:${serverPort}/temp/${filename}`,
            public_id: filename,
            isLocal: true
        };
    }
}

export { uploadOnCloudinary }

// Upload an image
// const uploadResult = await cloudinary.uploader
//     .upload(
//         'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//         public_id: 'shoes',
//     }
//     )
//     .catch((error) => {
//         console.log(error);
//     });