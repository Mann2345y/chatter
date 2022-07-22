import { axiosInstance } from "../axios";
import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  GET_CHAT_MESSAGES_REQUEST,
  GET_CHAT_MESSAGES_SUCCESS,
  GET_CHAT_MESSAGES_FAIL,
  DELETE_CHAT_MESSAGES_REQUEST,
  DELETE_CHAT_MESSAGES_SUCCESS,
  DELETE_CHAT_MESSAGES_FAIL,
  SET_RECIEVED_MESSAGES,
} from "../constants/messagesConstants";

export const sendMessage = (sender, content, chatId) => async (dispatch) => {
  try {
    dispatch({
      type: SEND_MESSAGE_REQUEST,
    });
    const { data } = await axiosInstance.post("/api/messages/send", {
      sender,
      content,
      chatId,
    });
    dispatch({
      type: SEND_MESSAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SEND_MESSAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getChatMessages = (chatId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_CHAT_MESSAGES_REQUEST,
    });
    const { data } = await axiosInstance.post("/api/messages/getMessages", {
      chatId,
    });
    dispatch({
      type: GET_CHAT_MESSAGES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CHAT_MESSAGES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteChatMessages = (chatId) => async (dispatch) => {
  try {
    dispatch({
      type: DELETE_CHAT_MESSAGES_REQUEST,
    });
    const { data } = await axiosInstance.delete(
      `/api/messages/deletechat/${chatId}`
    );
    if (data) {
      dispatch({
        type: DELETE_CHAT_MESSAGES_SUCCESS,
      });
    }
  } catch (error) {
    dispatch({
      type: DELETE_CHAT_MESSAGES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const setRecievedMessages = (message) => async (dispatch, getState) => {
  const { messages } = getState().chatMessages;
  const totalMessages = [...messages, message];
  dispatch({
    type: SET_RECIEVED_MESSAGES,
    payload: totalMessages,
  });
};
