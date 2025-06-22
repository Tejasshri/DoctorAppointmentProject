import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import Therapist from "../models/Therapist.model.js";
import Admin from "../models/Admin.model.js";
import sendEmail from "../utils/emailSender.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const generateToken = (user, role) => {
  return jwt.sign({ id: user._id, role }, JWT_SECRET, { expiresIn: "7d" });
};

// ✅ Check email to identify role
export const checkEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (admin) {
      return res.json({
        exists: true,
        role: admin.role,
        message: `Want to login as ${admin.role}?`,
      });
    }

    const therapist = await Therapist.findOne({ email });
    if (therapist) return res.json({ exists: true, role: "therapist" });

    const user = await User.findOne({ email });
    if (user) return res.json({ exists: true, role: "user" });

    return res.json({ exists: false, message: "Email not found" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
