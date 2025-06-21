/**
 * Auth Routes - Login, Signup, Token Verification
 * Developed by Tejas and Sanju
 */
import express from "express";
import { signup, login } from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ✅ Signup - Registers a new user or therapist
// Accepts name, email, phone, and password
router.post("/signup", signup);

// ✅ Login - Authenticates user and returns JWT
// Requires email and password in body
router.post("/login", login);

// ✅ Verify - Validates JWT token and returns user info
// Requires Authorization header with Bearer token
router.get("/verify", authenticate, (req, res) => {
  res.json({ message: "Token is valid", user: req.user });
});

export default router;
