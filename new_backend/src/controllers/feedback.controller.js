// 📁 controllers/feedbackController.js
import Feedback from "../models/Feedback.models.js";

export const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('appointmentId submittedBy');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate('appointmentId submittedBy');
    if (!feedback) return res.status(404).json({ error: 'Feedback not found' });
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createFeedback = async (req, res) => {
  try {
    const newFeedback = await Feedback.create(req.body);
    res.status(201).json(newFeedback);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateFeedback = async (req, res) => {
  try {
    const updated = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
