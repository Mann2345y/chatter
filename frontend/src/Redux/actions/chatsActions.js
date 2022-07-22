import {
  GET_GROUP_CHATS_REQUEST,
  GET_GROUP_CHATS_SUCCESS,
  GET_GROUP_CHATS_FAIL,
  GET_FRIENDS_CHATS_REQUEST,
  GET_FRIENDS_CHATS_SUCCESS,
  GET_FRIENDS_CHATS_FAIL,
  GET_USER_FRIENDS_REQUEST,
  GET_USER_FRIENDS_SUCCESS,
  GET_USER_FRIENDS_FAIL,
  SET_CURRENT_CHAT,
  CREATE_GROUP_CHAT_REQUEST,
  CREATE_GROUP_CHAT_SUCCESS,
  CREATE_GROUP_CHAT_FAIL,
  DELETE_GROUP_CHAT_REQUEST,
  DELETE_GROUP_CHAT_SUCCESS,
  DELETE_GROUP_CHAT_FAIL,
  UPDATE_GROUP_CHAT_REQUEST,
  UPDATE_GROUP_CHAT_SUCCESS,
  UPDATE_GROUP_CHAT_FAIL,
  CREATE_FRIEND_CHAT_REQUEST,
  CREATE_FRIEND_CHAT_SUCCESS,
  CREATE_FRIEND_CHAT_FAIL,
  DELETE_FRIEND_CHAT_REQUEST,
  DELETE_FRIEND_CHAT_SUCCESS,
  DELETE_FRIEND_CHAT_FAIL,
} from "../constants/chatsConstants";
import { axiosInstance } from "../axios";
import { socket } from "../../socket";

export const getGroupchats = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_GROUP_CHATS_REQUEST,
    });
    const { data } = await axiosInstance.get(`/api/chats`);
    const groupchats = data.filter((item) => item.isGroupChat);
    dispatch({
      type: GET_GROUP_CHATS_SUCCESS,
      payload: groupchats,
    });
    localStorage.setItem("groupchats", JSON.stringify(groupchats));
  } catch (error) {
    dispatch({
      type: GET_GROUP_CHATS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getFriendsChats = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_FRIENDS_CHATS_REQUEST,
    });
    const { data } = await axiosInstance.get(`/api/chats`);
    const friendsChats = data.filter((item) => item.isGroupChat === false);
    dispatch({
      type: GET_FRIENDS_CHATS_SUCCESS,
      payload: friendsChats,
    });
    localStorage.setItem("friendsChats", JSON.stringify(friendsChats));
  } catch (error) {
    dispatch({
      type: GET_FRIENDS_CHATS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getFriends = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_FRIENDS_REQUEST,
    });
    const { data } = await axiosInstance.get("/api/user/getFriends");
    dispatch({
      type: GET_USER_FRIENDS_SUCCESS,
      payload: data,
    });
    localStorage.setItem("friends", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: GET_USER_FRIENDS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createChat =
  (chatname, members, chatAvatar, isGroupChat) => async (dispatch) => {
    if (isGroupChat) {
      try {
        dispatch({
          type: CREATE_GROUP_CHAT_REQUEST,
        });
        const { data } = await axiosInstance.post(`/api/chats`, {
          chatname,
          members,
          isGroupChat,
          chatAvatar,
        });
        dispatch({
          type: CREATE_GROUP_CHAT_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: CREATE_GROUP_CHAT_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    } else {
      try {
        dispatch({
          type: CREATE_FRIEND_CHAT_REQUEST,
        });
        const { data } = await axiosInstance.post(`/api/chats`, {
          chatname,
          members,
          isGroupChat,
          chatAvatar,
        });
        dispatch({
          type: CREATE_FRIEND_CHAT_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: CREATE_FRIEND_CHAT_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };
export const setFriendToCurrentChat =
  (friendId) => async (dispatch, getState) => {
    const { chats } = getState().friendsChats;
    const { user } = getState().loggedUser;
    const chat = chats.filter((item) => {
      return (
        item.isGroupChat === false &&
        ((item.members[0] === user.id && item.members[1] === friendId) ||
          (item.members[0] === friendId && item.members[1] === user.id))
      );
    });
    dispatch({
      type: SET_CURRENT_CHAT,
      payload: chat[0],
    });
    socket.emit("join chat", chat[0]._id);
  };
export const setCurrentGroupChat = (chatId) => async (dispatch, getState) => {
  const { chats } = getState().groupchats;
  const chat = chats.find((item) => item._id === chatId);
  dispatch({
    type: SET_CURRENT_CHAT,
    payload: chat,
  });
  socket.emit("join chat", chat._id);
};
export const deleteChat =
  (chatId, isGroupChat) => async (dispatch, getState) => {
    if (isGroupChat) {
      try {
        dispatch({
          type: DELETE_GROUP_CHAT_REQUEST,
        });
        const { data } = await axiosInstance.post(`/api/chats/delete`, {
          chatId,
        });
        dispatch({
          type: DELETE_GROUP_CHAT_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: DELETE_GROUP_CHAT_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    } else {
      try {
        dispatch({
          type: DELETE_FRIEND_CHAT_REQUEST,
        });
        const { data } = await axiosInstance.post(`/api/chats/delete`, {
          chatId,
        });
        dispatch({
          type: DELETE_FRIEND_CHAT_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: DELETE_FRIEND_CHAT_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    }
  };
export const updateGroupChat =
  (chatId, chatname, chatAvatar, members) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_GROUP_CHAT_REQUEST,
      });
      const { data: updatedData } = await axiosInstance.post(
        `/api/chats/update`,
        {
          chatId,
          chatname,
          chatAvatar,
          members,
        }
      );
      dispatch({
        type: UPDATE_GROUP_CHAT_SUCCESS,
        payload: updatedData,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_GROUP_CHAT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
