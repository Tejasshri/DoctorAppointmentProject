/**
 * Feedback Routes - Collect & View User Feedback After Sessions
 * Developed by Tejas and Sanju
 */
import express from "express";
import {
  giveFeedback,
  getSessionFeedback,
} from "../controllers/feedback.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ✅ Submit Feedback
// User gives 1–5 rating + optional comment after session
router.post("/", authenticate, giveFeedback);

// ✅ Get Feedback for a Session
// Admin or therapist fetches session feedback
router.get("/:sessionId", authenticate, getSessionFeedback);

export default router;
