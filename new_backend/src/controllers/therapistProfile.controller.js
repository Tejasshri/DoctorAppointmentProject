// 📁 controllers/therapistController.js
import TherapistProfile from '../models/TherapistProfile.models.js';

export const getAllTherapists = async (req, res) => {
  try {
    const profiles = await TherapistProfile.find().populate('userId');
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getTherapistById = async (req, res) => {
  try {
    const profile = await TherapistProfile.findById(req.params.id).populate('userId');
    if (!profile) return res.status(404).json({ error: 'Therapist not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createTherapist = async (req, res) => {
  try {
    const newProfile = await TherapistProfile.create(req.body);
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateTherapist = async (req, res) => {
  try {
    const updatedProfile = await TherapistProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedProfile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteTherapist = async (req, res) => {
  try {
    await TherapistProfile.findByIdAndDelete(req.params.id);
    res.json({ message: 'Therapist deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
