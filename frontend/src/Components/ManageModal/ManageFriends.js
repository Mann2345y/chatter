import React, { useEffect } from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
import { UserTab } from "../Home/Tab";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Reusables/Loader";
import {
  createChat,
  createPersonalChat,
  deleteChat,
  deletePersonalChat,
} from "../../Redux/actions/chatsActions";
import { FaRegFrown } from "react-icons/fa";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
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
  width: 45%;
  padding: 50px;
`;
const BigLoader = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TabsWrapper = styled.div`
  height: 80%;
  width: 100%;
  overflow-y: auto;
  padding-right: 25px;
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
const RightBlock = styled.div`
  height: 100%;
  width: 45%;
  padding: 50px;
`;
const SearchWrapper = styled.div`
  height: 50px;
  width: 300px;
  display: flex;
  margin-top: 50px;
`;
const SearchInput = styled.input`
  height: 50px;
  width: 250px;
  border: 1px solid #9b84ee;
  padding: 0 15px;
  font-size: 1.2em;
  background: transparent;
  color: white;
  &:focus {
    outline: none;
  }
`;
const SearchButton = styled.div`
  height: 50px;
  width: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #9b84ee;
`;
const SearchResult = styled.div`
  height: 250px;
  width: 100%;
  display: flex;
  align-items: center;
`;
const ContactCard = styled.div`
  height: 120px;
  width: 350px;
  border-radius: 10px;
  background: #9b84ee;
  display: flex;
  justify-content: center;
  align-items: center;
  h2 {
    color: black;
    margin-left: 30px;
  }
`;
const ContactImage = styled.div`
  height: 80px;
  width: 80px;
  background: url(${(props) => props.image});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  border: 1px solid black;
  border-radius: 50%;
`;
const LoaderWrapper = styled(SearchResult)`
  justify-content: center;
`;
const AddUserButton = styled.div`
  height: 60px;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #9b84ee;
  border: 1px solid #9b84ee;
  transition: all 0.2s ease-in;
  &:hover {
    background: #9b84ee;
    color: black;
  }
`;

const ManageFriends = ({ friendsArray }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.loggedUser);
  const { users } = useSelector((state) => state.allUsers);
  const { loading: friendsLoading, friends } = useSelector(
    (state) => state.friends
  );
  const { chats } = useSelector((state) => state.friendsChats);
  const { loading: currChatLoading } = useSelector(
    (state) => state.currentChat
  );

  const searchUser = () => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].name === search) {
        setResult(users[i]);
        break;
      } else {
        setResult({ name: "User not found" });
      }
    }
  };
  const searchUserOnKeypress = (event) => {
    if (event.key === "Enter") {
      for (let i = 0; i < users.length; i++) {
        if (users[i].name === search) {
          setResult(users[i]);
          break;
        } else {
          setResult({ name: "User not found" });
        }
      }
    }
  };
  const createChatHandler = () => {
    const userExist = friends.find((item) => item === result._id);
    if (userExist) {
      setResult({ name: "User Already Added" });
    } else {
      const chatname = "";
      const members = [user.id, result._id];
      const chatAvatar = "./defaultAvatar.png";
      dispatch(createChat(chatname, members, chatAvatar, false));
      setResult({});
      setSearch("");
    }
  };
  const deleteChatHandler = (friendId) => {
    const chat = chats.find((item) => {
      return (
        ((item.members[0] === user.id && item.members[1] === friendId) ||
          (item.members[1] === user.id && item.members[0] === friendId)) &&
        item.isGroupChat === false
      );
    });
    console.log(chat);
    dispatch(deleteChat(chat._id, false));
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [result]);

  return (
    <Wrapper>
      <Header>Add or Remove Friends...</Header>
      <BlocksWrapper>
        <LeftBlock>
          {currChatLoading || friendsLoading ? (
            <BigLoader>
              <Loader />
            </BigLoader>
          ) : friendsArray.length > 0 ? (
            <>
              <h1 style={{ marginBottom: "25px" }}>Your Friends</h1>
              <TabsWrapper>
                {friendsArray.map((item, index) => {
                  return (
                    <UserTab
                      user={item}
                      key={index}
                      trashShow={true}
                      clickHandler={() => deleteChatHandler(item._id)}
                    />
                  );
                })}
              </TabsWrapper>
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
        </LeftBlock>
        <RightBlock>
          <h1>Search For Friend</h1>
          <SearchWrapper>
            <SearchInput
              placeholder="Enter Friend's Name"
              value={search}
              type="text"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onKeyPress={(e) => searchUserOnKeypress(e)}
            />
            <SearchButton onClick={() => searchUser()}>
              <AiOutlineSearch size={28} />
            </SearchButton>
          </SearchWrapper>
          {loading ? (
            <LoaderWrapper>
              <Loader height="150px" width="150px" />
            </LoaderWrapper>
          ) : (
            <SearchResult>
              {Object.keys(result).length === 0 ? (
                <></>
              ) : result.name === "User not found" ? (
                <h1>{result.name}</h1>
              ) : result.name === "User Already Added" ? (
                <h1>{result.name}</h1>
              ) : (
                <ContactCard>
                  <ContactImage image={result.image} />
                  <h2>{result.name}</h2>
                </ContactCard>
              )}
            </SearchResult>
          )}
          <AddUserButton onClick={createChatHandler}>
            <p>Add User</p>
          </AddUserButton>
        </RightBlock>
      </BlocksWrapper>
    </Wrapper>
  );
};

export default ManageFriends;
