import { initializeApp, cert, App } from "firebase-admin/app";
import { DocumentSnapshot, getFirestore, QuerySnapshot } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth"
import { SummaryObject } from "../models/summaryObject.js";
import admin from "firebase-admin";

let app : App;
let firestoreDb : FirebaseFirestore.Firestore;
let auth : Auth;

export const initializeFirebaseApp = () => {
  app = initializeApp({
    credential: admin.credential.applicationDefault(),
    projectId: "cloud-doc-summ-firebase"
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

export const retrieveDocuments = async (userId: string): Promise<SummaryObject[]> => {
  const docRef = firestoreDb
    .collection('documents')
    .where('userId', '==', userId)
    .orderBy('dateUnix', 'desc') as FirebaseFirestore.Query<SummaryObject>;

  const querySnap: QuerySnapshot<SummaryObject> = await docRef.get();
  const data: SummaryObject[] = [];
  querySnap.forEach((doc) => data.push(doc.data()));
  return data;
};

export const getFirebaseApp = () => app;
export const getFirebaseAuth = () => auth;

