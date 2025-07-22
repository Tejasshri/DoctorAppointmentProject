// 📁 controllers/paymentController.js
import Payment from '../models/Payment.models.js';

export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('appointmentId');
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('appointmentId');
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    res.json(payment);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createPayment = async (req, res) => {
  try {
    const newPayment = await Payment.create(req.body);
    res.status(201).json(newPayment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updatePayment = async (req, res) => {
  try {
    const updated = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deletePayment = async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.json({ message: 'Payment deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
