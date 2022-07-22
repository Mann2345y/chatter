import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Wrapper = styled.div`
  height: fit-content;
  width: fit-content;
  max-width: 40%;
  background: rgb(60, 60, 60);
  text-align: ${(props) => (props.send ? "right" : "left")};
  align-self: ${(props) => (props.send ? "flex-end" : "flex-start")};
  color: whitesmoke;
  border-top-left-radius: ${(props) => (props.send ? "15px" : "0")};
  border-top-right-radius: ${(props) => (props.send ? "0" : "15px")};
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  padding: 10px 20px;
  margin-bottom: 25px;
  z-index: 1;
  word-wrap: break-word;
  position: relative;
`;
const SenderName = styled.h6`
  margin-bottom: 5px;
  font-size: 1em;
  font-style: italic;
  font-family: Dosis, sans-serif;
`;

const Message = ({ send, message }) => {
  const { chat } = useSelector((state) => state.currentChat);
  return (
    <Wrapper send={send}>
      {chat.isGroupChat && <SenderName>{message.sender.name}</SenderName>}
      <p style={{ fontFamily: "Roboto Slab, sans-serif", fontSize: "1em" }}>
        {message.content}
      </p>
    </Wrapper>
  );
};

export default Message;
