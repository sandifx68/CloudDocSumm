import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home"
import SignUp from "./SignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signUp" element={<SignUp/>}/>

        {/* redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
