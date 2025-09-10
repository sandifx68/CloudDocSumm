import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import firebaseConfig from "./firebase_config.json"

const app = initializeApp(firebaseConfig)
const auth = getAuth()

export {app, auth};