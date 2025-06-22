/**
 * Express App Instance
 * Developed by Tejas and Sanju
 */
import express from "express";
import cors from "cors";

// Import Routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import therapistRoutes from "./routes/therapist.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
// import payoutRoutes from "./routes/payout.routes.js";
import feedbackRoutes from "./routes/feedback.routes.js";
import systemSettingRoutes from "./routes/systemSetting.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const app = express();

// Global Middlewares
app.use(cors());
app.use(express.json());

// Route Handlers
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/therapists", therapistRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/admins", adminRoutes);

app.use("/api/sessions", sessionRoutes);
app.use("/api/payments", paymentRoutes);
// app.use("/api/payouts", payoutRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/settings", systemSettingRoutes);
app.use("/api/settings", systemSettingRoutes);

// Default Route
app.get("/", (req, res) => res.send("Welcome to Dr.Psych API"));

export default app;
