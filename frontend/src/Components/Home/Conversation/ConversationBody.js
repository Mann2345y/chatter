import React, { useEffect } from "react";
import styled from "styled-components";
import bg from "./bg.jpg";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import { useState } from "react";
import Loader from "../../../Reusables/Loader";
import ScrollableFeed from "react-scrollable-feed";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { socket } from "../../../socket";
import { setRecievedMessages } from "../../../Redux/actions/messagesActions";
const Wrapper = styled.div`
  height: calc(100% - 120px);
  width: 100%;
  background-image: url(${(props) => props.image});
  background-size: cover;
`;
const InnerWrapper = styled.div`
  background: rgba(20, 20, 20, 0.5);
  height: 100%;
  width: 100%;
  display: flex;
`;
const MessageBlock = styled.div`
  height: 100%;
  width: ${(props) => (props.open ? "calc(100% - 250px)" : "100%")};
  transition: all 0.2s ease-in;
  padding: 20px;
  padding-right: 0;
  overflow-y: auto;
`;

const LoaderWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoaderInnerWrapper = styled.div`
  height: fit-content;
  width: fit-content;
  background: white;
  padding: 20px;
  border-radius: 10px;
`;
const ProfileBlock = styled.div`
  height: 100%;
  width: ${(props) => (props.open ? "250px" : "0")};
  transform: ${(props) => (props.open ? "scaleX(1)" : "scaleX(0)")};
  transform-origin: right;
  transition: all 0.2s ease-in;
  background: rgb(60, 60, 60);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  h1 {
    font-family: "Rokkitt", serif;
  }
  h4 {
    font-family: "Rokkitt", serif;
    margin-top: 10px;
    font-size: 1.2em;
    letter-spacing: 0.5px;
  }
`;
const CloseButton = styled(AiOutlineCloseSquare)`
  font-size: 28px;
  color: rgb(180, 180, 180);
  cursor: pointer;
  color: #9b84ee;
  align-self: flex-end;
`;
const ProfileImage = styled.div`
  height: 180px;
  width: 180px;
  background: url(${(props) => props.image});
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  margin: 25px 0;
  border: 1px solid black;
  border-radius: 50%;
`;

const ConversationBody = ({ openprofile, setOpenprofile }) => {
  const dispatch = useDispatch();
  const [messageState, setMessageState] = useState([]);
  const { loading, messages } = useSelector((state) => state.chatMessages);
  const { user } = useSelector((state) => state.loggedUser);
  const { chat } = useSelector((state) => state.currentChat);
  const { users } = useSelector((state) => state.allUsers);
  const Reciever = chat.members.find((item) => item !== user.id);
  const RecieverData = users.find((item) => item._id === Reciever);
  let send;
  useEffect(() => {
    if (!loading && Object.keys(messages).length > 0) {
      setMessageState(messages);
    } else if (!loading) {
      setMessageState([]);
    } else {
      setMessageState([...messageState]);
    }
  }, [messages, loading, messageState]);
  useEffect(() => {
    socket.on("message recieved", (messageRecieved) => {
      const message = JSON.parse(messageRecieved);
      dispatch(setRecievedMessages(message));
    });
  }, [dispatch]);
  return (
    <Wrapper image={bg}>
      <InnerWrapper>
        {loading ? (
          <LoaderWrapper>
            <LoaderInnerWrapper>
              <Loader></Loader>
            </LoaderInnerWrapper>
          </LoaderWrapper>
        ) : (
          <>
            <MessageBlock open={openprofile}>
              <ScrollableFeed>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingRight: "20px",
                  }}
                >
                  {messageState.map((item, index) => {
                    if (item.sender._id === user.id) {
                      send = true;
                    } else {
                      send = false;
                    }
                    return (
                      <Message message={item} send={send} key={index}></Message>
                    );
                  })}
                </div>
              </ScrollableFeed>
            </MessageBlock>
            <ProfileBlock open={openprofile}>
              <CloseButton onClick={() => setOpenprofile(false)} />
              <ProfileImage image={RecieverData.image} />
              <h1>{RecieverData.name}</h1>
              <h4>{RecieverData.email}</h4>
            </ProfileBlock>
          </>
        )}
      </InnerWrapper>
    </Wrapper>
  );
};

export default ConversationBody;
