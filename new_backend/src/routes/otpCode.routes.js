// 📁 routes/otpRoutes.js
import express from 'express';
import {
  getAllOtps,
  getOtpById,
  createOtp,
  updateOtp,
  deleteOtp
} from '../controllers/otpCode.controller.js';

const router = express.Router();

router.get('/', getAllOtps);
router.get('/:id', getOtpById);
router.post('/', createOtp);
router.put('/:id', updateOtp);
router.delete('/:id', deleteOtp);

export default router;