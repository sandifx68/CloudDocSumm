import { initializeApp, cert, App } from "firebase-admin/app";
import { DocumentSnapshot, getFirestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth"
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SummaryObject } from "../models/summaryObject.js";

let app : App;
let firestoreDb : FirebaseFirestore.Firestore;
let auth : Auth;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceAccount = path.join(__dirname,"../serviceAccountKeyFirebase.json")


export const initializeFirebaseApp = () => {
  app = initializeApp({
    credential: cert(serviceAccount)
  });
  firestoreDb = getFirestore(app);
  auth = getAuth()
}

export const uploadDocument = async (dataToUpload)  => {
  const docReference = firestoreDb.collection('documents').add(dataToUpload);
  return docReference;
}

export const retrieveDocument = async (docId) => {
  const docRef = firestoreDb.collection('documents')
    .doc(docId) as FirebaseFirestore.DocumentReference<SummaryObject>;
  const docSnap : DocumentSnapshot<SummaryObject> = await docRef.get();

  if (!docSnap.exists) {
    throw new Error("No document found with the specified id!")
  }
  
  const data = docSnap.data();
  return data
  
}

export const getFirebaseApp = () => app;
export const getFirebaseAuth = () => auth;

