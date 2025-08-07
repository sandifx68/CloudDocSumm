import { Request, Response, NextFunction } from "express"
import { getFirebaseAuth } from "../services/firebase.js"

export const verifyFirebaseToken = async (req : Request , res : Response, next : NextFunction ) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader?.startsWith('Bearer ')) {
        throw new Error("No authorization header found.")
    }
    const idToken = authHeader.split('Bearer ')[1];
    const uid = (await getFirebaseAuth().verifyIdToken(idToken)).uid
    req.headers['userId'] = uid;
    console.log("Decoded uid", uid)
    next();
}