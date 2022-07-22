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

export const chatMessagesReducer = (
  state = { loading: false, messages: [] },
  action
) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST: {
      return { loading: true, messages: [] };
    }
    case SEND_MESSAGE_SUCCESS: {
      return { loading: false, messages: action.payload };
    }
    case SEND_MESSAGE_FAIL: {
      return { loading: false, error: action.payload };
    }
    case GET_CHAT_MESSAGES_REQUEST: {
      return { loading: true, messages: [] };
    }
    case GET_CHAT_MESSAGES_SUCCESS: {
      return { loading: false, messages: action.payload };
    }
    case GET_CHAT_MESSAGES_FAIL: {
      return { loading: false, error: action.payload };
    }
    case DELETE_CHAT_MESSAGES_REQUEST: {
      return { loading: true, messages: [] };
    }
    case DELETE_CHAT_MESSAGES_SUCCESS: {
      return { loading: false, messages: [] };
    }
    case DELETE_CHAT_MESSAGES_FAIL: {
      return { loading: false, error: action.payload };
    }
    case SET_RECIEVED_MESSAGES: {
      return { loading: false, messages: action.payload };
    }
    default: {
      return state;
    }
  }
};
