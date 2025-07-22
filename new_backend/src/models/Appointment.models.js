import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  therapistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: { type: String, enum: ["assessment", "therapy"], required: true },
  date: String,
  time: String,
  gmeetLink: String,
  paymentStatus: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled", "no-show"],
    default: "pending",
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
