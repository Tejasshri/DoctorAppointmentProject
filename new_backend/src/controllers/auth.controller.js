// 📁 controllers/AuthController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.models.js";
import ResponseFormatter from "../utils/ResponseFormatter.js";
import { sendOtpToPhone, verifyOtpCode } from "../utils/otp.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser)
      return ResponseFormatter.error(res, "User already exists", 409);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    ResponseFormatter.success(
      res,
      {
        _id: user._id,
        name: user.name,
        role: user.role,
        token: generateToken(user._id),
      },
      "User registered",
      201
    );
  } catch (err) {
    ResponseFormatter.error(res, err.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password,  otpCode } = req.body;
    console.log(email, password, otpCode);
    const user = await User.findOne({ email });

    console.log(user)

    if (!user) return ResponseFormatter.error(res, "User not found", 404);
    let isMatch = false;
    if (user.role === "patient") {
      if (otpCode === user.otp) {
        isMatch = true;
      } else {
        isMatch = false;
        throw new Error("Otp is not matching");
      }
    } else {
      isMatch = await bcrypt.compare(password, user.password);
    }

    if (!isMatch)
      return ResponseFormatter.error(res, "Invalid credentials", 401);

    ResponseFormatter.success(
      res,
      {
        _id: user._id,
        name: user.name,
        role: user.role,
        token: generateToken(user._id),
      },
      "Login successful"
    );
  } catch (err) {
    console.log(err.message);
    ResponseFormatter.error(res, err.message);
  }
};

export const checkRole = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return ResponseFormatter.error(res, "User not found", 404);

    ResponseFormatter.success(
      res,
      {
        role: user.role,
      },
      "Role successfully fetched"
    );
  } catch (err) {
    ResponseFormatter.error(res, err.message);
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { phone, email } = req.body;

    const result = await sendOtpToPhone(phone);

    let user;
    if (email) {
      user = await User.findOne({ email });
    } else {
      user = await User.findOne({ phone });
    }
    if (!user) {
      return ResponseFormatter.error(res, "User not found", 404);
    }

    user.otp = result.otp;
    await user.save(); // ✅ save on document, not model

    ResponseFormatter.success(res, result, "OTP sent");
  } catch (err) {
    ResponseFormatter.error(res, err.message || "Internal server error");
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { phone, code } = req.body;
    const result = await verifyOtpCode(phone, code);
    ResponseFormatter.success(res, result, "OTP verified");
  } catch (err) {
    ResponseFormatter.error(res, err.message);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return ResponseFormatter.error(res, "User not found", 404);

    const otpResponse = await sendOtpToPhone(user.phone);
    ResponseFormatter.success(res, otpResponse, "OTP sent to registered phone");
  } catch (err) {
    ResponseFormatter.error(res, err.message);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { phone, code, newPassword } = req.body;
    const valid = await verifyOtpCode(phone, code);
    if (!valid) return ResponseFormatter.error(res, "Invalid OTP", 400);

    const hashed = await bcrypt.hash(newPassword, 10);
    const user = await User.findOneAndUpdate(
      { phone },
      { password: hashed },
      { new: true }
    );

    ResponseFormatter.success(
      res,
      { _id: user._id },
      "Password reset successful"
    );
  } catch (err) {
    ResponseFormatter.error(res, err.message);
  }
};
