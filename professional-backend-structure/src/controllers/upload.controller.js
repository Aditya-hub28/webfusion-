import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const uploadSingleImage = asyncHandler(async (req, res) => {
    if (!req.file) {
        throw new ApiError(400, 'Please upload an image file');
    }
    const uploaded = await uploadOnCloudinary(req.file.path);
    if (!uploaded || !uploaded.url) {
        throw new ApiError(500, 'Failed to upload image');
    }
    return res.status(200).json(
        new ApiResponse(200, {
            url: uploaded.url,
            public_id: uploaded.public_id,
            isLocal: uploaded.isLocal || false
        }, 'IMAGE UPLOADED SUCCESSFULLY')
    );
});

export const uploadMultipleImages = asyncHandler(async (req, res) => {
    if (!req.files || req.files.length === 0) {
        throw new ApiError(400, 'Please upload at least one image file');
    }
    const uploadedImages = [];
    for (const file of req.files) {
        const uploaded = await uploadOnCloudinary(file.path);
        if (uploaded && uploaded.url) {
            uploadedImages.push({
                url: uploaded.url,
                public_id: uploaded.public_id,
                isLocal: uploaded.isLocal || false
            });
        }
    }
    return res.status(200).json(
        new ApiResponse(200, uploadedImages, 'IMAGES UPLOADED SUCCESSFULLY')
    );
});
