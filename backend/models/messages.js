import mongoose from "mongoose";

const messagesSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chats",
    },
  },
  { timestamps: true }
);

const Messages = mongoose.model("Messages", messagesSchema);

export default Messages;
