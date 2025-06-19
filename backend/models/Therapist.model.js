import mongoose from 'mongoose';

const TherapistSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  passwordHash: String,
  languages: [String],
  specializations: [String],
  experienceYears: Number,
  profilePhotoUrl: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'suspended'], default: 'pending' },
  availability: Object,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

const Therapist = mongoose.model('Therapist', TherapistSchema);

export default Therapist;
