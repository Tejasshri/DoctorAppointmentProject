
import mongoose from 'mongoose';

const PayoutSchema = new mongoose.Schema({
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: 'Therapist' },
  totalSessions: Number,
  totalAmount: Number,
  paidOn: Date,
  notes: String
});

export default mongoose.model('Payout', PayoutSchema);
