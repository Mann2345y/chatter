import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import Contacts from "./Contacts";
import Profile from "./Profile";
import Groupchat from "./Groupchat";

const Motion = styled(motion.div)`
  height: 100%;
  width: 100%;
  position: absolute;
`;
const Wrapper = styled.div`
  height: 100%;
  width: 300px;
  background: rgb(55, 55, 55);
  position: relative;
`;
const ProfileBlock = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  transition: all 0.2s ease-in;
  left: ${(props) => (props.open ? "0" : "300px")};
  top: 0;
  background: rgb(60, 60, 60);
`;
const CloseButton = styled(AiOutlineCloseSquare)`
  font-size: 28px;
  cursor: pointer;
  color: #9b84ee;
`;
const ProfileBlockHeader = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10px;
`;
const ProfileContent = styled.div`
  height: calc(100% - 40px);
  width: 100%;
`;

const MidBar = ({
  openSlider,
  showContacts,
  showGC,
  setOpenSlider,
  setManageFriends,
  setManageGC,
  setOpenModal,
}) => {
  const { user } = useSelector((state) => state.loggedUser);
  const { friends } = useSelector((state) => state.friends);
  const [friendsArray, setFriendsArray] = useState([]);
  const friendsArrayRef = useRef();
  const setFriendsFunc = () => {
    setFriendsArray(friends);
  };
  friendsArrayRef.current = setFriendsFunc;

  useEffect(() => {
    friendsArrayRef.current();
  }, [friends]);

  return (
    <>
      <Wrapper>
        <AnimatePresence>
          {showContacts && (
            <Motion
              key="showcontacts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Contacts
                friendsArray={friendsArray}
                setManageGC={setManageGC}
                setOpenModal={setOpenModal}
                setManageFriends={setManageFriends}
              />
            </Motion>
          )}
          {showGC && (
            <Motion
              key="showGC"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Groupchat
                friendsArray={friendsArray}
                setManageGC={setManageGC}
                setOpenModal={setOpenModal}
                setManageFriends={setManageFriends}
              />
            </Motion>
          )}
        </AnimatePresence>
        <ProfileBlock open={openSlider}>
          <ProfileBlockHeader>
            <CloseButton size={28} onClick={() => setOpenSlider(false)} />
          </ProfileBlockHeader>
          <ProfileContent>
            <Profile />
          </ProfileContent>
        </ProfileBlock>
      </Wrapper>
    </>
  );
};

export default MidBar;
