
import { Link } from "react-router-dom";
import CredentialsTextbox from "../components/CredentialsTextbox";
import { useState } from "react";
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import ModularAuthentication from "../features/auth/components/ModularAuthentication";
import { useAuth } from "../contexts/useAuth";

export default function SignIn() {
  
  const { loading } = useAuth()

  const [email,setEmail] = useState<string>("")
  const [password,setPassword] = useState<string>("")
  const [error,setError] = useState<string>();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if(!loading) {
      await doSignInWithEmailAndPassword(email,password).catch(err => {
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
      />
      <CredentialsTextbox 
        label="Password" 
        password = {true} 
        placeholder="Enter your password" 
        value={password} 
        stateFunction={setPassword}
      />
    </>
  )

  const Footer = (
    <p className="text-center text-sm text-muted mt-6">
      {"Don't have an account? "}
      <Link to="/sign-up" className="text-accent hover:underline">
        Sign Up
      </Link>
    </p>
  )

  return <ModularAuthentication
    Textboxes={Textboxes}
    Footer={Footer} 
    handleSubmit={handleSubmit} 
    error={error} 
    title={"Enter your Account"} 
    buttonText={"Sign in"} 
    loadingText={"Signing in..."}    
  />
}
