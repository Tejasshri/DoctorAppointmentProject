import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  amount: Number,
  status: {
    type: String,
    enum: ["success", "failed", "refunded"],
    required: true,
  },
  paidAt: Date,
  failedReason: String,
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
