import io from "socket.io-client";
const SOCKET_URL = "https://chatterwebsapp.herokuapp.com/";

export const socket = io(SOCKET_URL, { transports: ["websocket"] });

socket.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});
