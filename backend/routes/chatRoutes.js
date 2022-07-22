import express from "express";
import {
  addGroupMember,
  createChat,
  deleteChat,
  getChatsOfUser,
  removeGroupMember,
  updateChat,
} from "../controllers/chatsController.js";
import { checkAuth } from "../middlewares/authentication.js";
const router = express.Router();

router.route("/").get(checkAuth, getChatsOfUser).post(checkAuth, createChat);
router.route("/update").post(checkAuth, updateChat);
router.route("/addMember").post(checkAuth, addGroupMember);
router.route("/removeMember").post(checkAuth, removeGroupMember);
router.route("/delete").post(checkAuth, deleteChat);

export default router;
