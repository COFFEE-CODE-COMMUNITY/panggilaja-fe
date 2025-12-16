import io from "socket.io-client";

const isDevelopment = import.meta.env.MODE === "development";

const SOCKET_URL = isDevelopment
  ? "http://localhost:5000" // Development
  : import.meta.env.VITE_SOCKET_URL || "https://api.panggilaja.space"; // Production



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

});

socket.on("disconnect", (reason) => {

});

socket.on("connect_error", (error) => {
  console.error("🔴 Socket connection error:", error.message);
  console.error("🔴 Error details:", error);
});

socket.on("reconnect", (attemptNumber) => {

});

socket.on("reconnect_attempt", (attemptNumber) => {

});

socket.on("reconnect_error", (error) => {
  console.error("🔴 Reconnection error:", error.message);
});

export default socket;
