import React from "react";
import { useState } from "react";
import { FaRegFrown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { createChat } from "../../Redux/actions/chatsActions";
import InputBox from "../../Reusables/InputBox/InputBox";
import Loader from "../../Reusables/Loader";
import { GCTab } from "../Home/Tab";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 15px;
`;
const Header = styled.h1`
  height: 50px;
  font-size: 2em;
  align-self: center;
`;
const BlocksWrapper = styled.div`
  height: calc(100% - 50px);
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const LeftBlock = styled.div`
  height: 100%;
  width: 40%;
  padding: 50px;
`;
const InputWrapper = styled.div`
  height: 60px;
  width: 300px;
  input {
    font-size: 1.4em;
  }
`;
const SelectUsersWrapper = styled.div`
  height: 350px;
  width: 100%;
  margin-top: 25px;
  overflow-y: auto;
  padding-right: 25px;
`;
const BigLoader = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RightBlock = styled.div`
  height: 100%;
  width: 40%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const RightButtons = styled.div`
  height: 60px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #9b84ee;
  border-radius: 10px;
  font-size: 1em;
  cursor: pointer;
  color: #d3d3d3;
  transition: all 0.2s ease-in;
  margin: 30px 0;
  &:hover {
    background: #9b84ee;
    color: black;
  }
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
const LoadingWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CreateGC = ({ friendsArray, setShowChoice, setShowCreate }) => {
  const dispatch = useDispatch();
  const { loading: currChatLoading } = useSelector(
    (state) => state.currentChat
  );
  const { user: loggedUser } = useSelector((state) => state.loggedUser);
  const { loading: userChatsLoading } = useSelector(
    (state) => state.groupchats
  );
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [gcname, setGcname] = useState("");
  const addSelectedUsers = (user) => {
    setSelectedUsers((items) => items.filter((item) => item._id !== user._id));
  };
  const removeSelectedUsers = (user) => {
    setSelectedUsers([...selectedUsers, user]);
  };
  const createChatHandler = () => {
    const chatname = gcname;
    let members = [...selectedUsers, loggedUser];
    members.forEach((item, index) => {
      members[index] = item._id ? item._id : item.id;
    });
    const chatAvatar = "./defaultAvatar.png";
    dispatch(createChat(chatname, members, chatAvatar, true));
  };
  return (
    <Wrapper>
      <Header>Create New Group Chat...</Header>
      {userChatsLoading ? (
        <LoadingWrapper>
          <Loader height="300px" width="300px"></Loader>{" "}
        </LoadingWrapper>
      ) : (
        <BlocksWrapper>
          <LeftBlock>
            <InputWrapper>
              <InputBox
                placeholder="Name for New Group..."
                value={gcname}
                changeHandler={setGcname}
              />
            </InputWrapper>
            <h2 style={{ marginTop: "50px" }}>Select Users</h2>
            <>
              {currChatLoading || userChatsLoading ? (
                <BigLoader>
                  <Loader />
                </BigLoader>
              ) : friendsArray.length > 0 ? (
                <>
                  <SelectUsersWrapper>
                    {friendsArray.map((item, index) => {
                      return (
                        <GCTab
                          user={item}
                          key={index}
                          trashShow={true}
                          addSelectedUsers={addSelectedUsers}
                          removeSelectedUsers={removeSelectedUsers}
                        />
                      );
                    })}
                  </SelectUsersWrapper>
                </>
              ) : (
                <NoChatWrapper>
                  <FaRegFrown
                    color="#d3d3d3"
                    size={49}
                    style={{ marginBottom: "25px" }}
                  ></FaRegFrown>
                  <h3>No Friends Added</h3>
                </NoChatWrapper>
              )}
            </>
          </LeftBlock>
          <RightBlock>
            <RightButtons onClick={createChatHandler}>
              <p>Create</p>
            </RightButtons>
            <RightButtons
              onClick={() => {
                setShowChoice(true);
                setShowCreate(false);
              }}
            >
              <p>Cancel</p>
            </RightButtons>
          </RightBlock>
        </BlocksWrapper>
      )}
    </Wrapper>
  );
};

export default CreateGC;
