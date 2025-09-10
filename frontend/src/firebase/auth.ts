import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const doSignUpWithEmailAndPassword = async (email? : string, password? : string, confirm? : string) => {
    if(!email)
        return Promise.reject(new Error("Email field is empty!"));
    if(!password)
        return Promise.reject(new Error("Password field is empty!"))
    if(password != confirm)
        return Promise.reject(new Error("Passwords do not match!"))

    return createUserWithEmailAndPassword(auth, email, password)
        .catch((err : any) => {
            switch (err.code) {
                case "auth/email-already-in-use":
                  throw new Error("An account with this email already exists!");
                case "auth/invalid-email":
                  throw new Error("The email address is not valid!");
                case "auth/weak-password":
                  throw new Error("Password should be at least 6 characters!");
                default:
                  throw new Error(err.message || "Failed to sign up");
              }
        })
};

export const doSignInWithEmailAndPassword = (email : string, password : string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignOut = () => {
    return auth.signOut();
}