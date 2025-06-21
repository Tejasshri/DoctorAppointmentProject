/**
 * Check if email is registered and if it's an admin
 * Developed by Tejas and Sanju
 */
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import Therapist from "../models/Therapist.model.js";
import Admin from "../models/Admin.model.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role || "user" }, JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const signup = async (req, res) => {
  const { name, email, phone, password, role = "user" } = req.body;

  try {
    const Model = role === "therapist" ? Therapist : User;
    const existing = await Model.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "Email already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new Model({ name, email, phone, passwordHash });
    await user.save();

    const token = generateToken(user);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password, role = "user" } = req.body;

  try {
    const Model = role === "therapist" ? Therapist : User;
    const user = await Model.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    if (role === "therapist" && user.status !== "approved") {
      return res
        .status(403)
        .json({ error: "Therapist account not approved yet" });
    }

    const token = generateToken(user);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

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
    if (therapist) {
      return res.json({ exists: true, role: "therapist" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.json({ exists: true, role: "user" });
    }

    return res.json({ exists: false, message: "Email not found" });
  } catch (err) {
    console.error("Error in checkEmail:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
