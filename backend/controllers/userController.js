import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import generateToken from "../tokenGenerator.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const Users = await User.find({});
  res.json(Users);
});
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email }).populate("friends chats");
  if (userFound && (await userFound.matchPassword(password))) {
    res.status(200).json({
      id: userFound._id,
      name: userFound.name,
      email: userFound.email,
      token: generateToken(userFound._id),
      image: userFound.image,
    });
  } else {
    res.status(401);
    throw new Error("Invalid user credentials");
  }
});
export const getLoggedUserData = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("friends chats");
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      image: user.image,
    });
  } catch (error) {
    res.status(401).json({ message: "Invalid User Id" });
  }
});
export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password, image } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(404);
    throw new Error("User already exist!");
  } else {
    const createdUser = await User.create({
      name,
      email,
      password,
      image,
      friends: [],
      chats: [],
    });
    if (createdUser) {
      res.status(201).json({
        id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        token: generateToken(createdUser._id),
        image: createdUser.image,
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  }
});
export const removeUser = asyncHandler(async (req, res) => {
  const userExists = await User.findById(req.params.id);
  if (userExists) {
    const userToDelete = await User.deleteOne({ _id: userExists._id });
    if (userToDelete) {
      res.status(201).json({
        message: "User Deleted",
      });
    }
  } else {
    res.status(401);
    throw new Error("Invalid User Id");
  }
});
export const updateUser = asyncHandler(async (req, res) => {
  const { userId, name, email, image } = req.body;
  const loggedUser = await User.findById(userId);
  if (loggedUser) {
    loggedUser.name = name || loggedUser.name;
    loggedUser.email = email || loggedUser.email;
    loggedUser.image = image || loggedUser.image;
    const updatedUser = await loggedUser.save();
    res.status(201).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      image: updatedUser.image,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid User data !");
  }
});
export const getUserFriends = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "friends",
    select: "_id name email image",
  });
  if (user) {
    res.status(201).json(user.friends);
  } else {
    res.status(401).send("Invalid User Id");
  }
});
