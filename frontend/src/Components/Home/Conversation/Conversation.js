import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ConversationHeader from "./ConversationHeader";
import ConversationBody from "./ConversationBody";
import ConversationFooter from "./ConversationFooter";
import { getChatMessages } from "../../../Redux/actions/messagesActions";

const Wrapper = styled.div`
  height: 100%;
  width: calc(100% - 375px);
  z-index: 1;
`;
const NoChatWrapper = styled.div`
  height: 100%;
  width: 100%;
  z-index: 1;
  background: rgb(60, 60, 60);
  border-left: 1px solid rgb(80, 80, 80);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Image = styled.div`
  height: 25%;
  width: 50%;
  margin-bottom: 50px;
  background: url("./images/logo.png");
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
`;

const Conversation = () => {
  const dispatch = useDispatch();
  const [openprofile, setOpenprofile] = useState(false);
  const { chat } = useSelector((state) => state.currentChat);
  useEffect(() => {
    if (Object.keys(chat).length > 0) {
      dispatch(getChatMessages(chat._id));
    }
  }, [dispatch, chat]);
  return (
    <Wrapper>
      {Object.keys(chat).length !== 0 ? (
        <>
          <ConversationHeader setOpenprofile={setOpenprofile} />
          <ConversationBody
            openprofile={openprofile}
            setOpenprofile={setOpenprofile}
          />
          <ConversationFooter />
        </>
      ) : (
        <NoChatWrapper>
          <Image />
          <h2>Add A Friend or Open a Group Chat to Start Chatting ...</h2>
        </NoChatWrapper>
      )}
    </Wrapper>
  );
};

export default Conversation;
