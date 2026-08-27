import { Router } from 'express';
import { uploadSingleImage, uploadMultipleImages } from '../controllers/upload.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/single').post(upload.single('image'), uploadSingleImage);
router.route('/multiple').post(upload.array('images', 5), uploadMultipleImages);

export default router;
