import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineSend } from "react-icons/ai";
import { sendMessage } from "../../../Redux/actions/messagesActions";
import { socket } from "../../../socket";

const Wrapper = styled.div`
  height: 60px;
  width: 100%;
  border-top: 1px solid rgb(80, 80, 80);
  padding: 0 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgb(45, 45, 45);
`;

const Input = styled.input`
  height: 40px;
  width: 80%;
  color: white;
  background: rgb(30, 30, 30);
  border: 1px solid rgb(80, 80, 80);
  padding: 0 25px;
  &:focus {
    outline: none;
  }
`;
const SendButton = styled.div`
  height: 40px;
  width: 60px;
  border-radius: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #9b84ee;
  margin-right: 25px;
  transition: all 0.2s ease-in;
  cursor: pointer;
  &:hover {
    background: rgb(45, 45, 45);
    border: 2px solid #9b84ee;
    color: #9b84ee;
  }
`;

const ConversationFooter = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [chatState, setChatState] = useState({});
  const { user } = useSelector((state) => state.loggedUser);
  const { chat } = useSelector((state) => state.currentChat);
  useEffect(() => {
    setChatState(chat);
  }, [chat]);
  const sendMessageOnEnterHandler = (event) => {
    if (event.key === "Enter") {
      const messageToSocket = {
        chat: chatState,
        message: {
          sender: { _id: user.id, name: user.name, email: user.email },
          content: message,
          chatId: chat._id,
        },
      };
      dispatch(sendMessage(user.id, message, chat._id));
      socket.emit("new message", messageToSocket);
      setMessage("");
    }
  };
  const sendMessageOnClickHandler = () => {
    if (message.length > 0) {
      const messageToSocket = {
        chat: chatState,
        message: {
          sender: { _id: user.id, name: user.name, email: user.email },
          content: message,
          chatId: chat._id,
        },
      };
      dispatch(sendMessage(user.id, message, chat._id));
      socket.emit("new message", messageToSocket);
      setMessage("");
    }
  };
  return (
    <Wrapper>
      <Input
        placeholder="Type your message here"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => sendMessageOnEnterHandler(e)}
      />
      <SendButton onClick={() => sendMessageOnClickHandler()}>
        <AiOutlineSend size={21} />
      </SendButton>
    </Wrapper>
  );
};

export default ConversationFooter;
