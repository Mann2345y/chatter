import React from "react";
import styled from "styled-components";
import { UserTab } from "../Tab";
import { useDispatch, useSelector } from "react-redux";
import { setFriendToCurrentChat } from "../../../Redux/actions/chatsActions";
import Loader from "../../../Reusables/Loader";

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
const LoadingWrapper = styled.div`
  height: 85%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Contacts = ({ setManageFriends, setOpenModal, setManageGC }) => {
  const dispatch = useDispatch();
  const setFriendChatHandler = (friendId) => {
    dispatch(setFriendToCurrentChat(friendId));
    console.log("first");
  };
  const { loading, friends: friendsArray } = useSelector(
    (state) => state.friends
  );

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
        {loading ? (
          <LoadingWrapper>
            {" "}
            <Loader height="250px" width="250px"></Loader>{" "}
          </LoadingWrapper>
        ) : friendsArray.length > 0 ? (
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
