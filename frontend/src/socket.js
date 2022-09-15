import io from "socket.io-client";
const SOCKET_URL = "http://chatterwebsapp.herokuapp.com";

export const socket = io(SOCKET_URL, { transports: ["websocket"] });
