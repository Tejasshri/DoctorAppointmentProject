import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
