import mongoose from "mongoose";

const chatsSchema = mongoose.Schema(
  {
    chatname: {
      type: String,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isGroupChat: {
      type: Boolean,
      required: true,
    },
    chatAvatar: {
      type: String,
      required: true,
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages",
      },
    ],
  },
  { timestamps: true }
);

const Chats = mongoose.model("Chats", chatsSchema);

export default Chats;
