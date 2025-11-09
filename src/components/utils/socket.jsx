import io from "socket.io-client";

const URL = "https://api.panggilaja.space/";

const socket = io(URL, {
  autoConnect: true,
});

export { socket };
