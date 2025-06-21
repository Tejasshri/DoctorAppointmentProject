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

// ✅ Signup (for user or therapist)
export const signup = async (req, res) => {
  try {
    const { name, email, password, phone, role = "user" } = req.body;
    const Model = role === "therapist" ? Therapist : User;

    const exists = await Model.findOne({ email });
    if (exists) return res.status(400).json({ error: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = new Model({
      name,
      email,
      phone,
      password: hashed,
      status: role === "therapist" ? "pending" : undefined,
    });

    await user.save();
    const token = generateToken(user, role);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Admin login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(admin, admin.role || "admin");
    res.json({ token, user: admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Therapist login
export const loginTherapist = async (req, res) => {
  try {
    const { email, password } = req.body;

    const therapist = await Therapist.findOne({ email });
    if (!therapist || therapist.status !== "approved") {
      return res
        .status(403)
        .json({ error: "Therapist not approved or not found" });
    }

    const isMatch = await bcrypt.compare(password, therapist.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = generateToken(therapist, "therapist");
    res.json({ token, user: therapist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Request OTP
export const requestOTP = async (req, res) => {
  try {
    const { phone, email } = req.body;

    if (!phone || !email) {
      return res.status(400).json({ error: "Phone and email are required" });
    }

    let user = await User.findOne({ phone, email });

    if (!user) {
      // Create new user if not exists
      user = await User.create({ phone, email });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    user.otpCode = otp; // ✅ Fix: assign actual OTP
    user.otpExpires = Date.now() + 5 * 60 * 1000; // 5 mins expiry
    await user.save();

    await sendEmail({
      to: email, // You can hardcode or use "tejasshrishekhar08@gmail.com" for now
      subject: "OTP for Doctor Appointment App",
      text: `Your OTP is ${otp}. Do not share this with anyone.`,
    });

    console.log(`OTP for ${phone} (${email}): ${otp}`);
    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("❌ Failed to send OTP:", err);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

// ✅ Verify OTP and issue JWT
export const verifyOTP = async (req, res) => {
  try {
    const { phone, email, otp } = req.body;

    console.log(phone, email, otp, "received");

    const user = await User.findOne({ phone, email });
    console.log(user);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Check OTP and expiry
    if (user.otpCode !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    // ✅ Clear OTP once verified
    user.otpCode = null;
    user.otpExpires = null;
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    const userObj = user.toObject();
    delete userObj.otpCode;
    delete userObj.otpExpires;

    res.json({ token, user: userObj });
  } catch (err) {
    console.error("❌ OTP verification failed:", err);
    res.status(500).json({ error: "OTP verification failed" });
  }
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
