import { constructSummaryObject, getSummaryObject, getSummaryObjects } from "../services/summaryService.js";
import { uploadDocument } from "../services/firebase.js"
import { Request } from "express";

export const handleSummaryUpload = async (req : Request, res) => {
    const userId = req.headers.userid;
    const file = req.file
    if (!file) {
        throw new Error("No file uploaded.")
    }
    if (typeof userId !== 'string') {
        throw new Error("User id passed in a wrong way.")
    }
    
    const pdfBuffer = file.buffer;
    const filename = file.originalname;
    const summaryObject = await constructSummaryObject(pdfBuffer,filename,userId);
    const docId = (await uploadDocument(summaryObject)).id
    res.json(summaryObject)
}

export const handleGetSummary = async (req : Request, res) => {
    const docId = req.headers.docid;
    if(!docId || typeof docId!=='string') {
        throw new Error("No document id provided or not passed well.")
    }
    const summaryObject = await getSummaryObject(docId);
    res.json(summaryObject)
}

export const handleGetSummaries = async (req : Request, res) => {
    const userId = req.headers.userid;
    if(typeof userId!=='string') {
        throw new Error("User id passed in a wrong way.")
    }
    const summaryObjects = await getSummaryObjects(userId)
    res.json(summaryObjects)
}