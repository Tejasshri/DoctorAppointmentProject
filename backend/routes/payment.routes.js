/**
 * Payment Routes - Payment Info Storage and Lookup
 * Developed by Tejas and Sanju
 */
import express from "express";
import {
  recordPayment,
  getAllPayments,
} from "../controllers/payment.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ✅ Record New Payment
// Stores payment after session is booked/paid
router.post("/", authenticate, recordPayment);

// ✅ Get All Payments
// Admin view to see successful or failed payments
router.get("/", authenticate, getAllPayments);

export default router;
