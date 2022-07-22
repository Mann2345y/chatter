import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { motion } from "framer-motion";
import Conversation from "../Components/Home/Conversation/Conversation";
import Header from "../Components/Home/Header";
import MidBar from "../Components/Home/MidBar/MidBar";
import SideBar from "../Components/Home/SideBar";
import Container from "../Reusables/Container";
import { socket } from "../socket.js";
import ManageModal from "../Components/ManageModal/ManageModal";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  transition: all 0.2s ease-in;
`;
const LeftBlock = styled.div`
  height: 100%;
  width: 375px;
  display: flex;
  flex-direction: column;
`;
const BarWrapper = styled.div`
  height: calc(100% - 60px);
  width: 100%;
  display: flex;
`;

const Home = () => {
  const [openSlider, setOpenSlider] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [manageFriends, setManageFriends] = useState(true);
  const [manageGC, setManageGC] = useState(false);
  const [showContacts, setShowContacts] = useState(true);
  const [showGC, setShowGC] = useState(false);
  const [friendsArray, setFriendsArray] = useState([]);
  const friendsArrayRef = useRef();

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.loggedUser);
  const { friends } = useSelector((state) => state.friends);
  const dispatch = useDispatch();

  const setFriendsFunc = () => {
    setFriendsArray(friends);
  };
  friendsArrayRef.current = setFriendsFunc;

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/");
    }
    socket.emit("setup", user);
    friendsArrayRef.current();
  }, [navigate, user, dispatch, user.friends]);

  useEffect(() => {
    friendsArrayRef.current();
  }, [friends]);

  return (
    <motion.div
      key="homepage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container openModal={openModal}>
        <Wrapper>
          <LeftBlock>
            <Header setOpenSlider={setOpenSlider}></Header>
            <BarWrapper>
              <SideBar
                setShowContacts={setShowContacts}
                setShowGC={setShowGC}
                setOpenSlider={setOpenSlider}
              />
              <MidBar
                setOpenSlider={setOpenSlider}
                openSlider={openSlider}
                showContacts={showContacts}
                showGC={showGC}
                setManageFriends={setManageFriends}
                setManageGC={setManageGC}
                setOpenModal={setOpenModal}
              />
            </BarWrapper>
          </LeftBlock>
          <Conversation />
        </Wrapper>
      </Container>
      <ManageModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        manageFriends={manageFriends}
        manageGC={manageGC}
        friendsArray={friendsArray}
      />
    </motion.div>
  );
};

export default Home;
