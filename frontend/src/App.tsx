import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Home from "./components/home/index";
import Dash_Home from "./components/Dash_home";
import { AuthProvider } from "./components/AuthProvider";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <div className="w-full h-screen flex flex-col">
          <Routes>
            <Route path="/" element={<Dash_Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/Dash_home" element={<Dash_Home />} />
            <Route path="*" element={<Login />} /> {/* Fallback route for unknown paths */}
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
