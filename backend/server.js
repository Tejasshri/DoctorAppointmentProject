/**
 * Server Entry File
 * Developed by Tejas and Sanju
 */
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // Mongoose connection logic
import app from './app.js'; // Express app instance

dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect DB and Start Server
const startServer = async () => {
  try {
    await connectDB(); // Ensure DB is connected before starting the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Server failed to start:', err.message);
    process.exit(1);
  }
};

startServer();
