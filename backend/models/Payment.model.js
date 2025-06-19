import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session' },
  amount: Number,
  paymentStatus: { type: String, enum: ['pending', 'success', 'failed', 'refunded'] },
  transactionId: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Payment', PaymentSchema);

