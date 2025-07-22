import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  contact: String,
  code: String,
  purpose: { type: String, enum: ['login', 'verify', 'reset'] },
  expiresAt: Date,
  verified: { type: Boolean, default: false }
});

const OtpCode = mongoose.model('OtpCode', otpSchema);

export default OtpCode