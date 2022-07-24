import io from "socket.io-client";
const SOCKET_URL = "https://chatterwebsapp.herokuapp.com/";

export const socket = io(SOCKET_URL);
