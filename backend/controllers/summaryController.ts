import { getSummaryObject } from "../services/summaryService.js";
import { uploadProcessedData } from "../services/firebase.js"
import { Request } from "express";

export const handleSummaryUpload = async (req : Request, res) => {
    // User already verified to be geniune through middleware
    const userId = req.headers.userId;
    const file = req.file
    if (!file) {
        throw new Error("No file uploaded.")
    }
    if (typeof userId !== 'string') {
        throw new Error("User id passed in a wrong way.")
    }
    
    const pdfBuffer = file.buffer;
    const filename = file.originalname;
    const summaryObject = await getSummaryObject(pdfBuffer,filename,userId);
    const docId = (await uploadProcessedData(summaryObject)).id
    console.log(`Uploaded data, doc id is ${docId}`)
    res.json(summaryObject)
}