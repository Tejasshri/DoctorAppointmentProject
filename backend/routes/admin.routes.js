/**
 * Admin Routes - Create and manage admin users
 * Only superadmins can create new admins.
 * Developed by Tejas and Sanju
 */
import express from 'express';
import {
  createAdmin,
  getAdmins,
  getAdminById,
  deleteAdmin,
  changeAdminPassword
} from '../controllers/admin.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeAdminRole } from '../middlewares/role.middleware.js'; // Custom role check


const router = express.Router();

// ✅ Create new admin (only superadmin allowed)
router.post('/', authenticate, authorizeAdminRole('superadmin'), createAdmin);

// ✅ Update admin password
router.put('/change-password', authenticate, changeAdminPassword);

// ✅ Get all admins (visible to superadmin/moderator)
router.get('/', authenticate, authorizeAdminRole(['superadmin', 'moderator']), getAdmins);

// ✅ Get single admin details
router.get('/:id', authenticate, authorizeAdminRole(['superadmin', 'moderator']), getAdminById);

// ✅ Delete an admin (only superadmin)
router.delete('/:id', authenticate, authorizeAdminRole('superadmin'), deleteAdmin);



export default router;
