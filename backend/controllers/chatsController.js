import asyncHandler from "express-async-handler";
import Chats from "../models/chats.js";
import User from "../models/user.js";

export const createChat = asyncHandler(async (req, res) => {
  let { chatname, members, isGroupChat, chatAvatar } = req.body;
  if (!isGroupChat) {
    chatname = "";
  }
  const createdChat = await Chats.create({
    chatname,
    members,
    isGroupChat,
    chatAvatar,
    messages: [],
  });
  if (createdChat && isGroupChat) {
    const membersData = await User.find({ _id: { $in: members } });
    membersData.forEach(async (item) => {
      item.chats = [...item.chats, createdChat._id];
      await item.save();
    });
    const loggedUser = await User.findById(req.user._id).populate("chats");

    const groupchats = loggedUser.chats.filter(
      (item) => item.isGroupChat === true
    );
    groupchats.push(createdChat);
    res.status(201).json([...groupchats]);
  } else if (createdChat && !isGroupChat) {
    let firstUser = await User.findById(members[0]);
    let secondUser = await User.findById(members[1]);
    firstUser.friends = [...firstUser.friends, members[1]];
    secondUser.friends = [...secondUser.friends, members[0]];
    firstUser.chats = [...firstUser.chats, createdChat._id];
    secondUser.chats = [...secondUser.chats, createdChat._id];
    await firstUser.save();
    await secondUser.save();
    const loggedUser = await User.findById(req.user._id).populate("friends");
    res.status(201).json(loggedUser.friends);
  } else {
    res.status(400);
    throw new Error("Invalid Chat Data");
  }
});
export const updateChat = asyncHandler(async (req, res) => {
  const { chatId, chatname, chatAvatar, members } = req.body;
  const chatToUpdate = await Chats.findById(chatId);
  if (chatToUpdate) {
    chatToUpdate.chatname = chatname || chatToUpdate.chatname;
    chatToUpdate.chatAvatar = chatAvatar || chatToUpdate.chatAvatar;
  }
  if (chatToUpdate.isGroupChat) {
    chatToUpdate.members = members || chatToUpdate.members;
  }
  const updatedChat = await chatToUpdate.save();
  if (updatedChat) {
    res.status(201).json(updatedChat);
  } else {
    res.status(400);
    throw new Error("Invalid Chat Data");
  }
});
export const getChatsOfUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "chats",
    populate: {
      path: "messages",
      select: "sender content",
    },
  });
  if (user) {
    res.status(201).json(user.chats);
  } else {
    res.status(401).send("Invalid User Id");
  }
});
export const addGroupMember = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  const chat = await Chats.findById(chatId);
  if (chat.isGroupChat) {
    const userExist = chat.members.find((item) => item === userId);
    if (userExist) {
      res.status(401);
      throw new Error("User already in members");
    } else {
      chat.members.push(userId);
      const updatedChat = await chat.save();
      res.status(201).json(updatedChat);
    }
  } else {
    res.status(401);
    throw new Error("Not a group chat");
  }
});
export const removeGroupMember = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;
  const chat = await Chats.findById(chatId);
  if (chat.isGroupChat) {
    chat.members = chat.members.filter((item) => {
      return item != userId;
    });
    const updatedChat = await chat.save();
    res.status(201).json(updatedChat);
  } else {
    res.status(401);
    throw new Error("Not a group chat");
  }
});
export const deleteChat = asyncHandler(async (req, res) => {
  const { chatId } = req.body;
  const chat = await Chats.findById(chatId);
  await Chats.deleteOne({ _id: chatId });
  if (chat) {
    if (chat.isGroupChat === true) {
      let membersData = await User.find({ _id: { $in: chat.members } });
      membersData.forEach(async (item) => {
        item.chats = item.chats.filter((item) => {
          return item.toString() !== chatId.toString();
        });
        await item.save();
      });
      const loggedUser = await User.findById(req.user._id).populate("chats");
      const groupchats = loggedUser.chats.filter(
        (item) => item.isGroupChat === true
      );
      res.status(201).json(groupchats);
    } else {
      let firstUser = await User.findById(chat.members[0]);
      let secondUser = await User.findById(chat.members[1]);
      firstUser.chats = firstUser.chats.filter((item) => {
        return item.toString() !== chat._id.toString();
      });
      firstUser.friends = firstUser.friends.filter((item) => {
        return item.toString() != chat.members[1].toString();
      });
      secondUser.chats = secondUser.chats.filter((item) => {
        return item.toString() !== chat._id.toString();
      });
      secondUser.friends = secondUser.friends.filter((item) => {
        return item.toString() != chat.members[0].toString();
      });
      await firstUser.save();
      await secondUser.save();
      const loggedUser = await User.findById(req.user._id).populate("friends");
      res.status(201).json(loggedUser.friends);
    }
  } else {
    res.status(401).send("Invalid Chat Id");
  }
});
