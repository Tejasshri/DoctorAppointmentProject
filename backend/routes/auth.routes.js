import express from 'express';
import {
  signup,
  loginAdmin,
  loginTherapist,
  requestOTP,
  verifyOTP,
  checkEmail
} from '../controllers/auth.controller.js';

const router = express.Router();

// 🔐 Signup (user & therapist)
router.post('/signup', signup);

// 🔐 Admin login
router.post('/admin-login', loginAdmin);

// 🧠 Therapist login
router.post('/therapist-login', loginTherapist);

// 📲 OTP login flow for users
router.post('/request-otp', requestOTP);
router.post('/verify-otp', verifyOTP);

// 🧪 Utility
router.post('/check-email', checkEmail);

export default router;
