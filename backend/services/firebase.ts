import { initializeApp, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth"
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

export const uploadProcessedData = async (dataToUpload)  => {
  const docReference = firestoreDb.collection('documents').add(dataToUpload);
  return docReference;
}

export const getFirebaseApp = () => app;
export const getFirebaseAuth = () => auth;

