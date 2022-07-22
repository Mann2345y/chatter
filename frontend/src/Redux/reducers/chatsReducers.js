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

export const groupchatsReducer = (
  state = { loading: false, groupchats: {} },
  action
) => {
  switch (action.type) {
    case GET_GROUP_CHATS_REQUEST: {
      return { loading: true, chats: {} };
    }
    case GET_GROUP_CHATS_SUCCESS: {
      return { loading: false, chats: action.payload };
    }
    case GET_GROUP_CHATS_FAIL: {
      return { loading: false, error: action.payload };
    }
    case CREATE_GROUP_CHAT_REQUEST: {
      return { loading: true, chats: {} };
    }
    case CREATE_GROUP_CHAT_SUCCESS: {
      return { loading: false, chats: action.payload };
    }
    case CREATE_GROUP_CHAT_FAIL: {
      return { loading: false, error: action.payload };
    }
    case DELETE_GROUP_CHAT_REQUEST: {
      return { loading: true, chats: {} };
    }
    case DELETE_GROUP_CHAT_SUCCESS: {
      return { loading: false, chats: action.payload };
    }
    case DELETE_GROUP_CHAT_FAIL: {
      return { loading: false, error: action.payload };
    }

    default: {
      return state;
    }
  }
};
export const userFriendsReducer = (
  state = { loading: false, friends: {} },
  action
) => {
  switch (action.type) {
    case GET_USER_FRIENDS_REQUEST: {
      return { loading: true, friends: {} };
    }
    case GET_USER_FRIENDS_SUCCESS: {
      return { loading: false, friends: action.payload };
    }
    case GET_USER_FRIENDS_FAIL: {
      return { loading: false, error: action.payload };
    }
    case CREATE_FRIEND_CHAT_REQUEST: {
      return { loading: true, friends: {} };
    }
    case CREATE_FRIEND_CHAT_SUCCESS: {
      return { loading: false, friends: action.payload };
    }
    case CREATE_FRIEND_CHAT_FAIL: {
      return { loading: false, error: action.payload };
    }
    case DELETE_FRIEND_CHAT_REQUEST: {
      return { loading: true, friends: {} };
    }
    case DELETE_FRIEND_CHAT_SUCCESS: {
      return { loading: false, friends: action.payload };
    }
    case DELETE_FRIEND_CHAT_FAIL: {
      return { loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};
export const friendsChatsReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FRIENDS_CHATS_REQUEST: {
      return { loading: false, chats: {} };
    }
    case GET_FRIENDS_CHATS_SUCCESS: {
      return { loading: false, chats: action.payload };
    }
    case GET_FRIENDS_CHATS_FAIL: {
      return { loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};
export const currentChatReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_CHAT: {
      return { chat: action.payload };
    }

    case UPDATE_GROUP_CHAT_REQUEST: {
      return { loading: true, chat: {} };
    }
    case UPDATE_GROUP_CHAT_SUCCESS: {
      return { loading: false, chat: action.payload };
    }
    case UPDATE_GROUP_CHAT_FAIL: {
      return { loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};
