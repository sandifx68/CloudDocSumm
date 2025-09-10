//import React from "react";
import { Link, Navigate } from "react-router-dom";
import CredentialsTextbox from "../components/CredentialsTextbox";
import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { doSignUpWithEmailAndPassword } from "../firebase/auth";

function SignUp() {

  const { userLoggedIn } = useAuth();

  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [confirm,setConfirm] = useState<string>("")
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [error,setError] = useState<string>();

  async function handleSubmit(e : any) {
    e.preventDefault();

    if(!isSigningIn) {
      setIsSigningIn(true)
      await doSignUpWithEmailAndPassword(email,password,confirm).catch(err => {
        setIsSigningIn(false)
        setError(err.message)
      })
    }
    
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-text">
      {userLoggedIn && (<Navigate to={"/"} replace={true}/>)}
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white/5 backdrop-blur">
        <h1 className="text-2xl font-bold mb-6 text-center text-text">
          Create an Account
        </h1>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <CredentialsTextbox 
            label="Email" 
            placeholder="you@example.com" 
            value={email} 
            stateFunction={setEmail} 
          />
          <CredentialsTextbox 
            label="Password" 
            password = {true} 
            placeholder="Enter your password" 
            value={password} 
            stateFunction={setPassword} 
          />
          <CredentialsTextbox 
            label="Password Confirmation" 
            password = {true} 
            placeholder="Re-enter your password" 
            value={confirm}
            stateFunction={setConfirm}
          />

          <button
            type="submit"
            disabled={isSigningIn}
            className="w-full py-2 rounded-lg bg-button text-white font-medium hover:opacity-70 transition cursor-pointer"
          >
            {isSigningIn ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-red-500 mt-3">
          {error}
        </p>

        {/* Footer */}
        <p className="text-center text-sm text-muted mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-accent hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
