import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  language: String,
  issueDescription: String,
  otpCode: String,
  otpExpires: { type: Date },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  uuid: {
    type: String,
    unique: true,
    sparse: true, // allows multiple nulls if not set
  },
  ip_address: String,
  role: {
    type: String,
    enum: ["guest", "user"],
    default: "guest",
  },
});

export default mongoose.model("User", UserSchema);
