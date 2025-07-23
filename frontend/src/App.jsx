// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import socket from "./utils/socket";

import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AOS from "aos";
import "aos/dist/aos.css";

import "./App.css";
import SignUp from "./pages/SignUp";

export default function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  // utils/auth.js

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
