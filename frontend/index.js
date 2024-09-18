import React from "react";
import ReactDOM from "react-dom/client";
import "./globals.css";
import { BrowserRouter } from "react-router-dom";
import Login from "./src/components/auth/login";
import Register from "./src/components/auth/register";
import Header from "./src/components/header";
import Home from "./src/components/home/index";
import Dash_Home from "./src/components/Dash_home";
import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
function App() {
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/Dash_home",
      element: <Dash_Home />,
    },
  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <Header />
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;