import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { getAllUsersReducer, userLoginReducer } from "./reducers/userReducers";
import {
  groupchatsReducer,
  userFriendsReducer,
  currentChatReducer,
  friendsChatsReducer,
} from "./reducers/chatsReducers";
import { chatMessagesReducer } from "./reducers/messagesReducers";

const reducer = combineReducers({
  loggedUser: userLoginReducer,
  allUsers: getAllUsersReducer,
  groupchats: groupchatsReducer,
  currentChat: currentChatReducer,
  friends: userFriendsReducer,
  friendsChats: friendsChatsReducer,
  chatMessages: chatMessagesReducer,
});

const loggedUserFromStorage = localStorage.getItem("loggedUser")
  ? JSON.parse(localStorage.getItem("loggedUser"))
  : {};

const groupchatsFromStorage = localStorage.getItem("groupchats")
  ? JSON.parse(localStorage.getItem("groupchats"))
  : [];

const friendsChatsFromStorage = localStorage.getItem("friendsChats")
  ? JSON.parse(localStorage.getItem("friendsChats"))
  : [];

const friendsFromStorage = localStorage.getItem("friends")
  ? JSON.parse(localStorage.getItem("friends"))
  : [];

const allusersFromStorage = localStorage.getItem("allusers")
  ? JSON.parse(localStorage.getItem("allusers"))
  : {};

const InitialState = {
  loggedUser: { user: loggedUserFromStorage },
  allUsers: { users: allusersFromStorage },
  groupchats: { chats: groupchatsFromStorage },
  friends: { friends: friendsFromStorage },
  friendsChats: { chats: friendsChatsFromStorage },
  currentChat: { chat: {} },
  chatMessages: { messages: {} },
};

const middleware = [thunk];
const Store = createStore(
  reducer,
  InitialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;
