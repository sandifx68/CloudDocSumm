import { getSummaryObject } from "../services/summaryService.js";
import { uploadProcessedData } from "./firebase.js"

export const handleSummaryUpload = async (req, res) => {
    const userId = req.body.id;
    const file = req.file
    if (!file) {
        throw new Error("No file uploaded.")
    }
    
    const pdfBuffer = file.buffer;
    const filename = file.originalname;
    const summaryObject = await getSummaryObject(pdfBuffer,filename,userId);
    const docId = (await uploadProcessedData(summaryObject)).id
    console.log(`Uploaded data, doc id is ${docId}`)
    res.json(summaryObject)
}