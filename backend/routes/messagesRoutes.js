import express from "express";
import {
  sendMessage,
  deleteMessage,
  deleteMessagesOfChat,
  getChatMessages,
} from "../controllers/messagesController.js";
import { checkAuth } from "../middlewares/authentication.js";
const router = express.Router();

router.route("/send").post(checkAuth, sendMessage);
router.route("/getMessages").post(checkAuth, getChatMessages);
router.route("/deletechat/:id").delete(checkAuth, deleteMessagesOfChat);
router.route("/:id").delete(checkAuth, deleteMessage);

export default router;
