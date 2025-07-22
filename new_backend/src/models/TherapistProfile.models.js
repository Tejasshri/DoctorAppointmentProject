import mongoose from "mongoose";

const therapistProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  qualifications: String,
  specializations: [String],
  languages: [String],
  experienceYears: Number,
  availability: [{ day: String, slots: [String] }],
  profilePicture: String,
  paymentInfo: {
    upi: String,
    bankDetails: {
      accountNumber: String,
      ifsc: String,
      name: String,
    },
  },
  consentSigned: { type: Boolean, default: false },
});

const TherapistProfile = mongoose.model(
  "TherapistProfile",
  therapistProfileSchema
);

export default TherapistProfile;
