import Feedback from '../models/Feedback.model.js';

export const giveFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getSessionFeedback = async (req, res) => {
  const feedbacks = await Feedback.find({ sessionId: req.params.sessionId });
  res.json(feedbacks);
};
