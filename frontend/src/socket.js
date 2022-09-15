import io from "socket.io-client";
<<<<<<< HEAD
const SOCKET_URL = "http://localhost:5000";
=======
const SOCKET_URL = "http://chatterwebsapp.herokuapp.com";
>>>>>>> 60cd97c418a80c11640d001db9021d9486e25726

export const socket = io(SOCKET_URL, { transports: ["websocket"] });
