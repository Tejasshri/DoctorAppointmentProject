/**
 * WebSocket Server - Clean Auth with Separated Models
 * Developed by Tejas and Sanju
 */
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';
import Admin from '../models/Admin.model.js';
import Therapist from '../models/Therapist.model.js';

let ioInstance;

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  ioInstance = io;

  // Auth middleware
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    const uuid = socket.handshake.query.uuid;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id;

        // No role in JWT: infer from DB
        const user = await User.findById(socket.userId);
        const therapist = await Therapist.findById(socket.userId);
        const admin = await Admin.findById(socket.userId);

        socket.role = user ? 'user' : therapist ? 'therapist' : admin ? 'admin' : 'unknown';
      } catch (err) {
        return next(new Error('❌ Invalid JWT token'));
      }
    } else if (uuid) {
      // handle guest
      let user = await User.findOne({ uuid });
      if (!user) {
        user = await User.create({
          uuid,
          ip_address: socket.handshake.address,
          role: 'guest'
        });
      }

      socket.userId = user._id;
      socket.role = 'guest';
    } else {
      return next(new Error('❌ Token or UUID required'));
    }

    next();
  });

  io.on('connection', (socket) => {
    const room = `user_${socket.userId}`;
    socket.join(room);
    console.log(`✅ Socket connected: ${room} (${socket.role})`);

    socket.on('runFunction', ({ fn, payload }) => {
      io.to(room).emit('runFunction', { fn, payload });
    });

    socket.on('sendToUser', ({ toUserId, fn, payload }) => {
      io.to(`user_${toUserId}`).emit('runFunction', { fn, payload });
    });

    socket.on('sendToMultipleUsers', ({ userIds, fn, payload }) => {
      userIds.forEach(id => {
        io.to(`user_${id}`).emit('runFunction', { fn, payload });
      });
    });

    socket.on('disconnect', () => {
      console.log(`❌ Disconnected: user_${socket.userId}`);
    });
  });

  console.log('📡 WebSocket server ready');
};

export const getIO = () => ioInstance;
