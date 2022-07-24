import io from "socket.io-client";
const SOCKET_URL = "https://http://chatterwebsapp.herokuapp.com/";

export const socket = io(SOCKET_URL);
