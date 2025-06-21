/**
 * Admin Model - System-level users with roles (descriptive format)
 * Developed by Tejas and Sanju
 */
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["superadmin", "moderator", "support"],
      default: "superadmin",
      description: "Role that defines the access level of the admin",
    },
    roleDescription: {
      type: String,
      default: "Full system control", // override for other roles
    },
    ip_address: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// 🔐 Hash password before saving
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Compare password
adminSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
