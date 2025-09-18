import express from 'express';
import { upload } from '../middleware/upload.js';
import { verifyFirebaseToken } from '../middleware/auth.js'
import { handleSummaryUpload, handleGetSummary, handleGetSummaries } from '../controllers/summaryController.js';

const router = express.Router();

router.post('/createSummaryObject', verifyFirebaseToken, upload.single('file'), handleSummaryUpload);

router.get("/getSummaryObject/:id", verifyFirebaseToken, handleGetSummary);

router.get("/getSummaryObjects", verifyFirebaseToken, handleGetSummaries);

export default router;