import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_LOGOUT,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_FAIL,
} from "../constants/userConstants";
import { axiosInstance } from "../axios";
import { GET_CHAT_MESSAGES_SUCCESS } from "../constants/messagesConstants";
import {
  GET_FRIENDS_CHATS_FAIL,
  GET_FRIENDS_CHATS_REQUEST,
  GET_FRIENDS_CHATS_SUCCESS,
  GET_GROUP_CHATS_FAIL,
  GET_GROUP_CHATS_REQUEST,
  GET_GROUP_CHATS_SUCCESS,
  GET_USER_FRIENDS_FAIL,
  GET_USER_FRIENDS_REQUEST,
  GET_USER_FRIENDS_SUCCESS,
  SET_CURRENT_CHAT,
} from "../constants/chatsConstants";
import { getFriends, getFriendsChats, getGroupchats } from "./chatsActions";
import axios from "axios";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const { data: loginData } = await axiosInstance.post(`/api/user/login`, {
      email,
      password,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: loginData,
    });
    localStorage.setItem("loggedUser", JSON.stringify(loginData));
    dispatch(getFriendsChats());
    dispatch(getGroupchats());
    dispatch(getFriends());

    localStorage.setItem("loggedUser", JSON.stringify(loginData));
    try {
      dispatch({ type: GET_USER_FRIENDS_REQUEST });
      dispatch({ type: GET_FRIENDS_CHATS_REQUEST });
      dispatch({ type: GET_GROUP_CHATS_REQUEST });
      let config = {
        baseURL: "https://chatterwebsapp.herokuapp.com",
        headers: { Authorization: `Bearer ${loginData.token}` },
      };
      const req1 = axios.get("/api/user/getFriends", config);
      const req2 = axios.get("/api/chats", config);
      let [res1, res2] = await Promise.all([req1, req2]);
      const friendsChats = res2.data.filter(
        (item) => item.isGroupChat === false
      );
      const groupChats = res2.data.filter((item) => item.isGroupChat === true);
      dispatch({ type: GET_USER_FRIENDS_SUCCESS, payload: res1.data });
      dispatch({ type: GET_FRIENDS_CHATS_SUCCESS, payload: friendsChats });
      dispatch({ type: GET_GROUP_CHATS_SUCCESS, payload: groupChats });
      localStorage.setItem("groupchats", JSON.stringify(groupChats));
      localStorage.setItem("friendsChats", JSON.stringify(friendsChats));
      localStorage.setItem("friends", JSON.stringify(res1.data));
    } catch (error) {
      dispatch({ type: GET_USER_FRIENDS_FAIL, payload: error });
      dispatch({ type: GET_FRIENDS_CHATS_FAIL, payload: error });
      dispatch({ type: GET_GROUP_CHATS_FAIL, payload: error });
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const signupUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SIGNUP_REQUEST,
    });
    const { data } = await axiosInstance.post(`/api/user`, {
      name,
      email,
      password,
      image: "/defaultAvatar.png",
    });

    localStorage.setItem("loggedUser", JSON.stringify(data));
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateUser = (userId, name, email) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_USER_REQUEST,
    });
    const { data } = await axiosInstance.put(`/api/user`, {
      userId,
      name,
      email,
    });
    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: data,
    });
    localStorage.setItem("loggedUser", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logoutUser = () => async (dispatch) => {
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("groupchats");
  localStorage.removeItem("friends");
  localStorage.removeItem("friendsChats");
  localStorage.removeItem("allusers");

  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({
    type: SET_CURRENT_CHAT,
    payload: {},
  });
  dispatch({
    type: GET_CHAT_MESSAGES_SUCCESS,
    payload: {},
  });
};
export const getAllUsers = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: GET_ALL_USERS_REQUEST,
    });
    let { data } = await axiosInstance.get(`/api/user`);

    dispatch({
      type: GET_ALL_USERS_SUCCESS,
      payload: data,
    });
    localStorage.setItem("allusers", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: GET_ALL_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
