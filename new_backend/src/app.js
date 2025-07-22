/**
 * Express App Instance
 * Developed by Tejas and Sanju
 */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import otpRoutes from "./routes/otpCode.routes.js"; // optional if separated

const app = express();
dotenv.config();

// Global Middlewares
app.use(cors());
app.use(express.json());

// API Route Handlers
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/feedback", feedbackRoutes);

// Health Check Route
app.get("/", (req, res) => res.send("✅ Dr.Psych API is running"));

export default app;
