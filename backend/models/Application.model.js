import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' },
  documentUrls: [String],
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  adminComment: String,
  submittedAt: { type: Date, default: Date.now },
  reviewedAt: Date
});

export default mongoose.model('Application', ApplicationSchema);
