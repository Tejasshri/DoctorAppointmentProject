// controllers/auth/admin.auth.js
import Admin from "../../models/Admin.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET;

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (!admin) return res.status(404).json({ message: "Admin not found" });

  const isMatch = await admin.matchPassword(password);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({ token, admin });
};
