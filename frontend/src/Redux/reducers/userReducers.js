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

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: {
      return { loading: true, user: {} };
    }
    case USER_LOGIN_SUCCESS: {
      return { loading: false, user: action.payload };
    }
    case USER_LOGIN_FAIL: {
      return { loading: false, error: action.payload };
    }
    case USER_SIGNUP_REQUEST: {
      return { loading: true, user: {} };
    }
    case USER_SIGNUP_SUCCESS: {
      return { loading: false, user: action.payload };
    }
    case USER_SIGNUP_FAIL: {
      return { loading: false, error: action.payload };
    }
    case UPDATE_USER_REQUEST: {
      return { ...state, loading: true };
    }
    case UPDATE_USER_SUCCESS: {
      return { loading: false, user: action.payload };
    }
    case UPDATE_USER_FAIL: {
      return { loading: false, error: action.payload };
    }
    case USER_LOGOUT: {
      return { loading: false, user: {} };
    }
    default: {
      return state;
    }
  }
};

export const getAllUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_ALL_USERS_REQUEST: {
      return { loading: true, users: {} };
    }
    case GET_ALL_USERS_SUCCESS: {
      return { loading: false, users: action.payload };
    }
    case GET_ALL_USERS_FAIL: {
      return { loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};
