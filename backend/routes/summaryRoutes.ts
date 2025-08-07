import express from 'express';
import { upload } from '../middleware/upload.js';
import { verifyFirebaseToken } from '../middleware/auth.js'
import { handleSummaryUpload } from '../controllers/summaryController.js';
import { handleGetSummary } from '../controllers/summaryController.js'

const router = express.Router();

router.post('/createSummaryObject', verifyFirebaseToken, upload.single('document'), handleSummaryUpload);

router.get("/getSummaryObject", verifyFirebaseToken, handleGetSummary);

export default router;