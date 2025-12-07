import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Welcome from  "./pages/Welcome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import "./styles.css";
import SubmitPlace from "./pages/SubmitPlace";
import HomePage from "./pages/HomePage";
import SubmitImages from "./pages/SubmitImages";
import SubmitEvent from "./pages/SubmitEvent";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard"
          element={
             <Dashboard />}/>
              <Route path="/home" element={<HomePage />} />
               <Route path="/submitp" element={<SubmitPlace />} />
               <Route path="/submitevent" element={<SubmitEvent />} />
               <Route path="/submitimg" element={<SubmitImages />} />
            
        {/* fallback */}
        <Route path="*" element={<Navigate to="/signin" replace />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;