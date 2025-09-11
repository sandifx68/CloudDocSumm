import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home"
import SignUp from "./SignUp";
import { AuthProvider } from "../contexts/AuthProvider";
import SignIn from "./SIgnIn";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/sign-in" element={<SignIn/>}/>

        {/* redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
