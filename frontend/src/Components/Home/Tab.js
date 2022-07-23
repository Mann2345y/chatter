import React, { useState } from "react";
import styled from "styled-components";
import { IoIosAddCircleOutline as Add } from "react-icons/io";
import { BiTrashAlt as Trash } from "react-icons/bi";
import { AnimatePresence, motion } from "framer-motion";

const Wrapper = styled.div`
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 25px;
  border-bottom: 1px solid rgb(70, 70, 70);
  cursor: pointer;
`;
const AvatarWrapper = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url(${(props) => props.image});
  background-size: contain;
  border-radius: 50%;
  margin-right: 10px;
`;
const TextBody = styled.div`
  h4 {
    color: #d3d3d3;
  }
  text-align: left;
  margin-left: 5px;
`;
const GCWrapper = styled.div`
  height: 60px;
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 50px;
  padding-left: 10px;
  border-bottom: 1px solid rgb(70, 70, 70);
  cursor: pointer;
  transition: all 0.2s ease-in;
  border-radius: 5px;
  font-size: 1.2em;
  background: ${(props) => (props.selected ? "#9b84ee" : "inherit")};
  color: ${(props) => (props.selected ? "black" : "#d3d3d3")};
`;

const ChatTab = ({ user, clickHandler, trashShow, addShow }) => {
  return (
    <Wrapper isChat={true} onClick={() => clickHandler(user._id)}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <AvatarWrapper image={user.chatAvatar}></AvatarWrapper>
        <TextBody>
          <h4>{user.chatname}</h4>
        </TextBody>
      </div>
      <div>
        {addShow && (
          <Add
            color="#d3d3d3"
            size={21}
            style={{ cursor: "pointer", marginRight: "5px" }}
            onClick={() => clickHandler}
          />
        )}
        {trashShow && (
          <Trash color="#d3d3d3" size={21} style={{ cursor: "pointer" }} />
        )}
      </div>
    </Wrapper>
  );
};
const UserTab = ({ user, clickHandler, trashShow, addShow }) => {
  const clickFunc = () => {
    if (!trashShow) {
      clickHandler();
    }
  };
  return (
    <Wrapper onClick={clickFunc}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <AvatarWrapper image={user.image}></AvatarWrapper>
        <TextBody>
          <h4>{user.name}</h4>
        </TextBody>
      </div>
      <div>
        {addShow && (
          <Add
            color="#d3d3d3"
            size={21}
            style={{ cursor: "pointer", marginRight: "5px" }}
            onClick={() => clickHandler}
          />
        )}
        {trashShow && (
          <Trash
            color="#d3d3d3"
            size={21}
            style={{ cursor: "pointer" }}
            onClick={clickHandler}
          />
        )}
      </div>
    </Wrapper>
  );
};
const GCTab = ({ user, addSelectedUsers, removeSelectedUsers }) => {
  const [isSelected, setIsSelected] = useState(false);
  const clickHandler = () => {
    if (isSelected) {
      addSelectedUsers(user);
    } else {
      removeSelectedUsers(user);
    }
    setIsSelected(!isSelected);
  };
  return (
    <GCWrapper onClick={clickHandler} selected={isSelected}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <AvatarWrapper image={user.image}></AvatarWrapper>
        <TextBody>
          <p>{user.name}</p>
        </TextBody>
      </div>
      <div style={{ position: "relative", top: "15px" }}>
        <AnimatePresence>
          {isSelected ? (
            <motion.div
              key="showadd"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                height: "fit-content",
                width: "fit-content",
                position: "absolute",
                bottom: "0",
              }}
            >
              <Trash size={21} style={{ cursor: "pointer" }} />
            </motion.div>
          ) : (
            <motion.div
              key="notshowadd"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                height: "fit-content",
                width: "fit-content",
                position: "absolute",
                bottom: "0",
              }}
            >
              <Add size={21} style={{ cursor: "pointer" }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GCWrapper>
  );
};

export { ChatTab, UserTab, GCTab };
