import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { url } from "../../config/settings";

const socket = io(url, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
  transports: ["websocket"], // Ensures it uses websocket first
  auth: {
    token: Cookies.get("chat_token"),
  },
});

// On connect_error: refresh token and reconnect
socket.on("connect_error", (err) => {
  console.error("Socket connection error:", err.message);

  // Refresh token before reconnecting
  socket.auth.token = Cookies.get("chat_token");

  // Wait and reconnect if not already connected
  setTimeout(() => {
    if (!socket.connected) {
      socket.connect();
    }
  }, 2000);
});

export default socket;
