// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection, DocumentReference } from "firebase/firestore";
import firebaseConfig from "../firebase_config.json" with { type: "json" };

let app;
let firestoreDb;
// Initialize Firebase
export const initializeFirebaseApp = () => {
  app = initializeApp(firebaseConfig);
  firestoreDb = getFirestore();
}

export const uploadProcessedData = async (dataToUpload) : Promise<DocumentReference> => {
  const docReference = addDoc(collection(firestoreDb, "documents"), dataToUpload);
  return docReference;
}

export const getFirebaseApp = () => app;

