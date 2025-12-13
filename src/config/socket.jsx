import io from "socket.io-client";

const isDevelopment = import.meta.env.MODE === "development";

const SOCKET_URL = isDevelopment
  ? "http://localhost:5000" // Development
  : import.meta.env.VITE_SOCKET_URL || "https://panggilaja.space"; // Production

console.log("🔌 Socket connecting to:", SOCKET_URL);
console.log("🌍 Environment:", import.meta.env.MODE);

export const socket = io(SOCKET_URL, {
  // Config penting untuk production
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
  timeout: 20000,

  // CORS config (penting untuk production!)
  withCredentials: true,

  // Auto connect
  autoConnect: true,
});

// Event listeners untuk debugging
socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
  console.log("🔗 Transport:", socket.io.engine.transport.name);
});

socket.on("disconnect", (reason) => {
  console.log("❌ Socket disconnected:", reason);
});

socket.on("connect_error", (error) => {
  console.error("🔴 Socket connection error:", error.message);
  console.error("🔴 Error details:", error);
});

socket.on("reconnect", (attemptNumber) => {
  console.log("🔄 Socket reconnected after", attemptNumber, "attempts");
});

socket.on("reconnect_attempt", (attemptNumber) => {
  console.log("🔄 Reconnection attempt", attemptNumber);
});

socket.on("reconnect_error", (error) => {
  console.error("🔴 Reconnection error:", error.message);
});

export default socket;
