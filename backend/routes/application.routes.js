/**
 * Application Routes - Therapist Onboarding Application
 * Developed by Tejas and Sanju
 */
import express from 'express';
import {
  submitApplication,
  getPendingApplications,
  updateApplicationStatus
} from '../controllers/application.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeRole } from '../middlewares/role.middleware.js';

const router = express.Router();

// ✅ Submit Therapist Application
// Therapist fills out onboarding form (documents, info)
router.post('/', authenticate, submitApplication);

// ✅ Get All Pending Applications
// Admin route to review therapist onboarding requests
router.get('/', authenticate, authorizeRole('admin'), getPendingApplications);

// ✅ Approve or Reject Application
// Admin updates status of a submitted application
router.put('/:id', authenticate, authorizeRole('admin'), updateApplicationStatus);

export default router;
