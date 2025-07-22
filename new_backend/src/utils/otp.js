// 📁 utils/otp.js

const otpStore = new Map(); // In-memory store for demo purposes

export const sendOtpToPhone = async (phone) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(phone, otp);

  console.log(`📲 OTP for ${phone}: ${otp}`); // Simulate sending

  return { phone, otp }; // In real app, don't send OTP back
};

export const verifyOtpCode = async (phone, code) => {
  const storedOtp = otpStore.get(phone);
  if (!storedOtp || storedOtp !== code) return false;
  otpStore.delete(phone); // Optional: remove after use
  return true;
};
