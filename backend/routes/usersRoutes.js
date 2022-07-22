import express from "express";
import {
  authUser,
  createUser,
  getAllUsers,
  getLoggedUserData,
  getUserFriends,
  removeUser,
  updateUser,
} from "../controllers/userController.js";
import { checkAuth } from "../middlewares/authentication.js";
const router = express.Router();

router.route("/").get(getAllUsers).post(createUser).put(checkAuth, updateUser);
router.route("/login").post(authUser);
router.route("/getFriends").get(checkAuth, getUserFriends);
router
  .route("/:id")
  .get(checkAuth, getLoggedUserData)
  .delete(checkAuth, removeUser);

export default router;
