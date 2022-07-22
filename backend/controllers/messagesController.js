import asyncHandler from "express-async-handler";
import Chats from "../models/chats.js";
import Messages from "../models/messages.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const { sender, content, chatId } = req.body;
  const sentMessage = await Messages.create({
    sender: sender,
    content: content,
    chatId: chatId,
  });
  if (sentMessage) {
    const chat = await Chats.findById(chatId);
    chat.messages = [...chat.messages, sentMessage._id];
    const updatedChat = await chat.save();
    const messages = await Messages.find({
      _id: { $in: updatedChat.messages },
    }).populate({ path: "sender", select: "name _id email" });
    res.status(200).json(messages);
  } else {
    res.status(401).send("Message sending failed");
  }
});
export const getChatMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.body;
  const chat = await Chats.findById(chatId).populate({
    path: "messages",
    populate: {
      path: "sender",
      select: "name _id email",
    },
  });
  if (chat) {
    res.status(200).json(chat.messages);
  } else {
    res.status(401).send("Invalid Chat Id");
  }
});
export const deleteMessage = asyncHandler(async (req, res) => {
  const message = await Messages.findById(req.params.id);
  if (message) {
    const messageToDelete = await Messages.deleteOne({ _id: message._id });
    if (messageToDelete) {
      res.status(201).json({
        message: "Message Deleted",
      });
    } else {
      res.status(401).send("Message Deletion Failed");
    }
  } else {
    res.status(401);
    throw new Error("Invalid User Id");
  }
});
export const deleteMessagesOfChat = asyncHandler(async (req, res) => {
  const deletedMessages = await Messages.deleteMany({ chatId: req.params.id });
  const chat = await Chats.findById(req.params.id);
  chat.messages = [];
  await chat.save();
  if (deletedMessages) {
    res.status(200).send(chat.messages);
  } else {
    res.status(400).send("Message deletion failed");
  }
});
