import Therapist from "../models/Therapist.model.js";

export const createTherapist = async (req, res) => {
  try {
    const therapist = new Therapist(req.body);
    await therapist.save();
    res.status(201).json(therapist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllTherapists = async (req, res) => {
  const therapists = await Therapist.find();
  res.json(therapists);
};

export const getTherapistById = async (req, res) => {
  const therapist = await Therapist.findById(req.params.id);
  therapist
    ? res.json(therapist)
    : res.status(404).json({ error: "Not found" });
};

export const updateTherapist = async (req, res) => {
  const therapist = await Therapist.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  therapist
    ? res.json(therapist)
    : res.status(404).json({ error: "Not found" });
};

export const deleteTherapist = async (req, res) => {
  const result = await Therapist.findByIdAndDelete(req.params.id);
  result
    ? res.json({ success: true })
    : res.status(404).json({ error: "Not found" });
};
