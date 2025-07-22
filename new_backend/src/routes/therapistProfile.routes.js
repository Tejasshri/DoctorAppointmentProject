// 📁 routes/therapistRoutes.js
import express from 'express';
import {
  getAllTherapists,
  getTherapistById,
  createTherapist,
  updateTherapist,
  deleteTherapist
} from '../controllers/therapistProfile.controller.js';

const router = express.Router();

router.get('/', getAllTherapists);
router.get('/:id', getTherapistById);
router.post('/', createTherapist);
router.put('/:id', updateTherapist);
router.delete('/:id', deleteTherapist);

export default router;
