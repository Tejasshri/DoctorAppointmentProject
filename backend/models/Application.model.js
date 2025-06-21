import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    therapistId: { type: mongoose.Schema.Types.ObjectId, ref: "Therapist" },
    documents: [
      {
        name: { type: String, required: true }, // e.g., "RCI Certificate"
        url: { type: String, required: true }, // e.g., actual file link
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminComment: String,
    submittedAt: { type: Date, default: Date.now },
    reviewedAt: Date,
  },
  {
    timestamps: true, // ✅ Adds createdAt and updatedAt
  }
);

export default mongoose.model("Application", ApplicationSchema);
