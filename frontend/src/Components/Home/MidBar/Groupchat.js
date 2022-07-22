import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setCurrentGroupChat } from "../../../Redux/actions/chatsActions";
import Loader from "../../../Reusables/Loader";
import { ChatTab } from "../Tab";

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

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;
const LoadingWrapper = styled.div`
  height: 78%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NoChatsWrapper = styled(LoadingWrapper)`
  flex-direction: column;
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
const Groupchat = ({ setManageFriends, setOpenModal, setManageGC }) => {
  const dispatch = useDispatch();
  const { loading, chats } = useSelector((state) => state.groupchats);
  const clickHandler = (chatId) => {
    dispatch(setCurrentGroupChat(chatId));
  };

  return (
    <Wrapper>
      <ManageFriendsButton
        onClick={() => {
          setManageFriends(false);
          setOpenModal(true);
          setManageGC(true);
        }}
      >
        <h4>Manage Group Chats</h4>
      </ManageFriendsButton>
      {loading ? (
        <LoadingWrapper>
          <Loader></Loader>
        </LoadingWrapper>
      ) : Object.keys(chats).length > 0 ? (
        <>
          {chats.map((item, index) => {
            return (
              <div key={index}>
                <ChatTab user={item} clickHandler={clickHandler} />
              </div>
            );
          })}
        </>
      ) : (
        <NoChatsWrapper>
          <NotFoundImage />
          <h3>No Chats Found !!</h3>
        </NoChatsWrapper>
      )}
    </Wrapper>
  );
};

export default Groupchat;
