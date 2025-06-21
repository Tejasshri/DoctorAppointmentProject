/**
 * Therapist Routes - CRUD for Therapist Accounts
 * Developed by Tejas and Sanju
 */
import express from "express";
import {
  createTherapist,
  getAllTherapists,
  getTherapistById,
  updateTherapist,
  deleteTherapist,
} from "../controllers/therapist.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

// ✅ Create Therapist - Adds a new therapist (manual only)
// This is separate from application process
router.post("/", createTherapist);

// ✅ Get All Therapists
// Returns a list of all registered therapists
router.get("/", getAllTherapists);

// ✅ Get Therapist by ID
// Returns a therapist’s full profile by MongoDB ID
router.get("/:id", getTherapistById);

// ✅ Update Therapist Info
// Requires authentication and therapist ID
router.put("/:id", authenticate, updateTherapist);

// ✅ Delete Therapist
// Permanently deletes therapist (admin use only)
router.delete("/:id", authenticate, deleteTherapist);

export default router;
