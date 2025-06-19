import Payment from '../models/Payment.model.js';

export const recordPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllPayments = async (_, res) => res.json(await Payment.find().populate('userId sessionId'));
