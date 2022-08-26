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
import { SET_CURRENT_CHAT } from "../constants/chatsConstants";
import { getFriends, getFriendsChats, getGroupchats } from "./chatsActions";

export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const { data } = await axiosInstance.post(`/api/user/login`, {
      email,
      password,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("loggedUser", JSON.stringify(data));
    dispatch(getFriendsChats());
    dispatch(getGroupchats());
    dispatch(getFriends());
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
