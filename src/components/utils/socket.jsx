import io from "socket.io-client";

const socket = io("https://api.panggilaja.space");

export { socket };
