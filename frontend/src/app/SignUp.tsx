//import React from "react";
import { Link } from "react-router-dom";
import CredentialsTextbox from "../components/CredentialsTextbox";
import { useState } from "react";
import { doSignUpWithEmailAndPassword } from "../services/auth";
import ModularAuthentication from "../features/auth/components/ModularAuthentication";
import { useAuth } from "../features/auth/contexts/useAuth";

export default function SignUp() {

  const { loading } = useAuth()

  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [confirm,setConfirm] = useState<string>("")
  const [error,setError] = useState<string>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if(!loading) {
      await doSignUpWithEmailAndPassword(email,password,confirm).catch(err => {
        setError(err.message)
      })
    }
  }

  const Textboxes = (
    <>
      <CredentialsTextbox 
        label="Email" 
        placeholder="you@example.com" 
        value={email} 
        stateFunction={setEmail} 
        autoComplete={false}
      />
      <CredentialsTextbox 
        label="Password" 
        password = {true} 
        placeholder="Enter your password" 
        value={password} 
        stateFunction={setPassword} 
        autoComplete={false}
      />
      <CredentialsTextbox 
        label="Password Confirmation" 
        password = {true} 
        placeholder="Re-enter your password" 
        value={confirm}
        stateFunction={setConfirm}
        autoComplete={false}
      />
    </>
  )

  const Footer = (
    <p className="text-center text-sm text-muted mt-6">
      {"Already have an account? "}
      <Link to="/sign-in" className="text-accent hover:underline">
        Sign In
      </Link>
    </p>
  )

  return <ModularAuthentication
    Textboxes={Textboxes}
    Footer={Footer} 
    handleSubmit={handleSubmit} 
    error={error} 
    title={"Create an Account"} 
    buttonText={"Sign up"} 
    loadingText={"Signing up..."}    
  />
}
