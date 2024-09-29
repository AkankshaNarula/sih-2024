import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Home, { MinistryHome } from "./components/page.tsx";
import Dash_Home from "./components/Dash_home";
import Summarizer from "./components/summarizer";
import { AuthProvider } from "./components/AuthProvider";
import OTPInput from "./components/OTPInput";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <div className="w-full h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<MinistryHome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/otp" element={<OTPInput></OTPInput>} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/Dash_home" element={<Dash_Home />} />
            <Route path="/summarizer" element={<Summarizer />} />
            <Route path="*" element={<Login />} /> {/* Fallback route for unknown paths */}
            {/* Fallback to MinistryHome if the route is unknown */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
