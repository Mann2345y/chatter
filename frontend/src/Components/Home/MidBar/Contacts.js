import React from "react";
import styled from "styled-components";
import { UserTab } from "../Tab";
import { useDispatch } from "react-redux";
import { setFriendToCurrentChat } from "../../../Redux/actions/chatsActions";

const TabsWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const NoChatWrapper = styled.div`
  height: 78%;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;
const ManageFriendsButton = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1.2px;
  border-bottom: 1px solid rgb(80, 80, 80);
  cursor: pointer;
  background: rgb(40, 40, 40);
`;
const NotFoundImage = styled.div`
  height: 100px;
  width: 100px;
  background: url("./notfound.svg");
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  margin-bottom: 50px;
`;
const Contacts = ({
  friendsArray,
  setManageFriends,
  setOpenModal,
  setManageGC,
}) => {
  const dispatch = useDispatch();
  const setFriendChatHandler = (friendId) => {
    dispatch(setFriendToCurrentChat(friendId));
    console.log("first");
  };

  return (
    <>
      <ManageFriendsButton
        onClick={() => {
          setOpenModal(true);
          setManageFriends(true);
          setManageGC(false);
        }}
      >
        <h4>Manage Friends</h4>
      </ManageFriendsButton>
      <TabsWrapper>
        {friendsArray.length > 0 ? (
          friendsArray.map((item, index) => {
            return (
              <div key={index}>
                <UserTab
                  user={item}
                  clickHandler={() => {
                    setFriendChatHandler(item._id);
                  }}
                />
              </div>
            );
          })
        ) : (
          <NoChatWrapper>
            <NotFoundImage />
            <h3>No Chats, Add Some friends to start Chatting</h3>
          </NoChatWrapper>
        )}
      </TabsWrapper>
    </>
  );
};

export default Contacts;
