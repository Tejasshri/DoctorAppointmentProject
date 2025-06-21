/**
 * Admin Controller
 * Developed by Tejas and Sanju
 */
import Admin from "../models/Admin.model.js";
import bcrypt from "bcryptjs";

// ✅ Create a new admin (only superadmin can call this)
export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, role, roleDescription } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Admin already exists" });

    const admin = new Admin({ name, email, password, role, roleDescription });
    await admin.save();

    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    console.error("Create Admin Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all admins (superadmin, moderator)
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get single admin by ID
export const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Delete an admin (only superadmin)
export const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Change password (admin self or superadmin)
export const changeAdminPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const adminId = req.user._id; // Comes from auth middleware

    const admin = await Admin.findById(adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await admin.matchPassword(currentPassword);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect current password" });

    admin.password = newPassword;
    await admin.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
