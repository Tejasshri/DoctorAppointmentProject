/**
 * Dr.Psych Backend Server
 * Developed by Tejas and Sanju
 */

import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import therapistRoutes from './routes/therapist.routes.js';
import applicationRoutes from './routes/application.routes.js';
import sessionRoutes from './routes/session.routes.js';
import paymentRoutes from './routes/payment.routes.js';
// import payoutRoutes from './routes/payout.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import systemSettingRoutes from './routes/systemSetting.routes.js';

// Create Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/therapists', therapistRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/payments', paymentRoutes);
// app.use('/api/payouts', payoutRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/settings', systemSettingRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Dr.Psych API');
});

// Connect to MongoDB and start server
const PORT = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB Error:', err.message));
