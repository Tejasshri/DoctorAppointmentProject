/**
 * Session Routes - Booking and Tracking Therapy/Assessment Sessions
 * Developed by Tejas and Sanju
 */
import express from 'express';
import {
  createSession,
  getSessions,
  updateSessionStatus
} from '../controllers/session.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// ✅ Book New Session (assessment or therapy)
// Triggered when user confirms appointment
router.post('/', authenticate, createSession);

// ✅ Get All Sessions (admin or user-specific)
// Filter by therapist or user in controller
router.get('/', authenticate, getSessions);

// ✅ Update Session Status
// Used for marking sessions as completed, cancelled, no-show
router.put('/:id', authenticate, updateSessionStatus);

export default router;
