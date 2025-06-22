/**
 * User Routes - Patient Profile Management
 * Developed by Tejas and Sanju
 */
import express from 'express';
import {
  createUser,
  getUsers,
  getUserById
} from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { authorizeRole } from '../middlewares/role.middleware.js';

const router = express.Router();

router.post('/', createUser);
router.get('/', authenticate, authorizeRole('superadmin'), getUsers);
router.get('/:id', authenticate, getUserById);

export default router;
