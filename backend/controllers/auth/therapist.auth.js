// controllers/auth/therapist.auth.js
import Therapist from "../../models/Therapist.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerTherapist = async (req, res) => {
  const { name, email, phone, password, languages, specializations, experienceYears } = req.body;

  const exists = await Therapist.findOne({ email });
  if (exists) return res.status(400).json({ message: "Already registered" });

  const passwordHash = await bcrypt.hash(password, 10);

  const therapist = await Therapist.create({
    name, email, phone, passwordHash, languages, specializations, experienceYears
  });

  const token = jwt.sign({ id: therapist._id, role: 'therapist' }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(201).json({ token, therapist });
};

export const loginTherapist = async (req, res) => {
  const { email, password } = req.body;
  const therapist = await Therapist.findOne({ email });

  if (!therapist) return res.status(404).json({ message: "Therapist not found" });

  const isMatch = await bcrypt.compare(password, therapist.passwordHash);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign({ id: therapist._id, role: 'therapist' }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token, therapist });
};
