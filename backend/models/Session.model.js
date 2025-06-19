import mongoose from 'mongoose';

const SessionSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' },
  sessionType: { type: String, enum: ['assessment', 'therapy'] },
  sessionDate: Date,
  gmeetLink: String,
  status: { type: String, enum: ['upcoming', 'completed', 'cancelled', 'no-show'], default: 'upcoming' },
  notes: String,
  isLocked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Session', SessionSchema);
