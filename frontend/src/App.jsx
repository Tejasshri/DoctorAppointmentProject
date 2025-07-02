// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import socket from "./utils/socket";

import useAuthStore from "./stores/authStore";
import { useEffect } from "react";
import Cookies from "js-cookie"; // ✅ CORRECT

import { useState } from "react";
import Login from "./pages/Login";

function Home() {
  const { user, role } = useAuthStore();

  if (!user) return <Navigate to="/login" />;

  return (
    <div>
      <h2>Welcome, {user.name || "User"} 👋</h2>
      <p>Role: {role}</p>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    
  }, []);

  // utils/auth.js

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="*" element={<p>404 Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
}
