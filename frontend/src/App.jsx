import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dasboard from "./pages/Dasboard";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";
import { useAuthStore } from "./store/authStore";

import "./App.css";

function App() {
  return <div className="min-h-screen bg-gray-100"></div>;
}

export default App;
