// 📁 controllers/otpController.js
import OtpCode from '../models/OtpCode.models.js';

export const getAllOtps = async (req, res) => {
  try {
    const otps = await OtpCode.find();
    res.json(otps);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getOtpById = async (req, res) => {
  try {
    const otp = await OtpCode.findById(req.params.id);
    if (!otp) return res.status(404).json({ error: 'OTP not found' });
    res.json(otp);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createOtp = async (req, res) => {
  try {
    const newOtp = await OtpCode.create(req.body);
    res.status(201).json(newOtp);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateOtp = async (req, res) => {
  try {
    const updated = await OtpCode.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteOtp = async (req, res) => {
  try {
    await OtpCode.findByIdAndDelete(req.params.id);
    res.json({ message: 'OTP deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
