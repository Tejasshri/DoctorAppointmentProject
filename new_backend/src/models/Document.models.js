import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
  therapistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TherapistProfile",
    required: true,
  },
  docType: String,
  fileUrl: String,
  verified: { type: Boolean, default: false },
  uploadedAt: { type: Date, default: Date.now },
});

const Document = mongoose.model("Document", documentSchema);

export default Document;
