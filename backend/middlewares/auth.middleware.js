import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.model.js";
import Therapist from "../models/Therapist.model.js";

export const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};

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
