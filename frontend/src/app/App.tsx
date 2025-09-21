import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home"
import SignUp from "./SignUp";
import { AuthProvider } from "../contexts/AuthProvider";
import SignIn from "./SIgnIn";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { SummaryProvider } from "../features/documents/contexts/SummaryContext";

function App() {

  return (
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <SummaryProvider>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/sign-up" element={<SignUp/>}/>
            <Route path="/sign-in" element={<SignIn/>}/>

            {/* redirect unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          </BrowserRouter>
        </SummaryProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
