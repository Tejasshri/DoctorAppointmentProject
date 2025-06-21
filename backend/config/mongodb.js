import mongoose from "mongoose";

const connectDB = async () => {
  console.log("📡 Trying to connect to MongoDB...");

  mongoose.connection.on("connected", () =>
    console.log("✅ MongoDB connected")
  );

  mongoose.connection.on("error", (err) =>
    console.error("❌ MongoDB connection error:", err)
  );

  mongoose.connection.on("disconnected", () =>
    console.warn("⚠️ MongoDB disconnected")
  );

  try {
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("❌ Initial connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
