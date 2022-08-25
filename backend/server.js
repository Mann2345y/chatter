import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import usersRoutes from "./routes/usersRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messagesRoutes.js";
import http from "http";
import { Server } from "socket.io";
import { notFound, errorHandler } from "./middlewares/error.js";

dotenv.config();
connectDB();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { origins: "*:*" });

app.use(cors());
app.use(express.json());

app.use("/api/user", usersRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/messages", messageRoutes);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running ...");
  });
}
app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData.id);
    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.members) return console.log("chat.members not defined");
    chat.members.forEach((member) => {
      if (member == newMessageRecieved.sender) return;
      socket
        .in(member)
        .emit("message recieved", JSON.stringify(newMessageRecieved.message));
    });
  });
  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});
