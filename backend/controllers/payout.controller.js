import Payout from '../models/Payout.model.js';

export const createPayout = async (req, res) => {
  try {
    const payout = new Payout(req.body);
    await payout.save();
    res.status(201).json(payout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getTherapistPayouts = async (req, res) => {
  const payouts = await Payout.find({ therapistId: req.params.id });
  res.json(payouts);
};
