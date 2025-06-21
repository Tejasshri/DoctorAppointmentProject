/**
 * Server Entry File
 * Developed by Tejas and Sanju
 */
import dotenv from "dotenv";
import http from "http";
import connectDB from "./config/db.js"; // Mongoose connection logic
import app from "./app.js"; // Express app instance
import { initSocket } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect DB and Start Server
const startServer = async () => {
  try {
    await connectDB(); // Ensure DB is connected before starting the server

    const server = http.createServer(app); // 🔁 use server, not app.listen
    initSocket(server);                    // 🔌 Init socket on that server

    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server failed to start:", err.message);
    process.exit(1);
  }
};

startServer();
