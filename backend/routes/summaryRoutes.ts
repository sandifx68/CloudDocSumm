import express from 'express';
import { upload } from '../middleware/upload.js';
import { handleSummaryUpload } from '../controllers/summaryController.js';

const router = express.Router();

router.post('/getSummaryObject', upload.single('document'), handleSummaryUpload);

export default router;