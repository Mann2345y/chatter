import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import { AnimatePresence } from "framer-motion";
import { ScrollToTop } from "./scrollToTop";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  getFriends,
  getFriendsChats,
  getGroupchats,
  getUserChats,
} from "./Redux/actions/chatsActions";
import { getAllUsers } from "./Redux/actions/userActions";

function App() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  useEffect(() => {
    if (user) {
      dispatch(getGroupchats());
      dispatch(getFriends());
      dispatch(getFriendsChats());
    }
    dispatch(getAllUsers());
  }, [dispatch, user]);
  return (
    <AnimatePresence>
      <ScrollToTop>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} exact />
        </Routes>
      </ScrollToTop>
    </AnimatePresence>
  );
}

export default App;
