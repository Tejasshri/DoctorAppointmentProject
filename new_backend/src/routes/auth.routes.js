// 📁 routes/authRoutes.js
import express from 'express';
import {
  register,
  login,
  sendOtp,
  verifyOtp,
  forgotPassword,
  resetPassword,
  checkRole
} from '../controllers/auth.controller.js'

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/check-role', checkRole);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
