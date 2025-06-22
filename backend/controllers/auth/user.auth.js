// controllers/auth/user.auth.js
import User from "../../models/User.model.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const requestOTP = async (req, res) => {
  const { email, phone } = req.body;
  console.log(email, "email");
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({ email, phone, otpCode, otpExpires });
  } else {
    user.otpCode = otpCode;
    user.otpExpires = otpExpires;
    await user.save();
  }

  const tempUser = await User.findOne({ email });
  console.log(tempUser, email);

  console.log(`${otpCode} otpCode`);
  // TODO: Send OTP via email/SMS
  res.json({ message: "OTP sent", otp: otpCode }); // remove `otp` in prod
};

export const verifyOTP = async (req, res) => {
  const { email, otpCode } = req.body;
  console.log(email, otpCode);
  const user = await User.findOne({ email });
  console.log(user);
  if (!user || user.otpCode !== otpCode || user.otpExpires < new Date()) {
    return res.status(401).json({ message: "OTP invalid or expired" });
  }

  user.otpCode = null;
  user.otpExpires = null;
  user.role = "user";
  await user.save();

  const token = jwt.sign(
    { id: user._id, role: "user" },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  res.json({ token, user });
};

export const verifyUserToken = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-otpCode -otpExpires");

    if (!user || user.role !== "user") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json({ valid: true, user });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
