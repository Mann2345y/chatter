import React, { useEffect } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import InputBox from "../../Reusables/InputBox/InputBox";
import { deleteChat, updateGroupChat } from "../../Redux/actions/chatsActions";
import { AiOutlineSearch } from "react-icons/ai";
import Loader from "../../Reusables/Loader";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 25px 0;
  position: relative;
`;
const Motion = styled(motion.div)`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
`;
const Header = styled.h1`
  height: 50px;
  font-size: 2em;
  align-self: center;
`;
const ChatsBlock = styled.div`
  max-height: 80%;
  width: 100%;
  margin-top: 25px;
  overflow-y: auto;
  padding: 25px 50px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
  grid-gap: 50px;
`;
const EditGCTab = styled.div`
  height: 90px;
  width: ${(props) => (props.isEdit ? "80%" : "100%")};
  background: #9b84ee;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 25px;
  justify-content: space-between;
  margin: ${(props) => (props.isEdit ? "30px 0" : "")};
`;
const Avatar = styled.div`
  height: 60px;
  width: 60px;
  background: url(${(props) => props.image});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-repeat: no-repeat;
`;
const Text = styled.h3`
  font-size: 1.2em;
  margin-left: 20px;
  color: black;
`;
const TabButtons = styled.div`
  justify-self: flex-end;
`;
const EditBlock = styled(motion.div)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const EditLeftBlock = styled.div`
  height: 100%;
  width: 45%;
  padding: 50px;
`;
const EditRightBlock = styled.div`
  height: 100%;
  width: 45%;
  padding: 50px;
`;
const InputWrapper = styled.div`
  height: 60px;
  width: 300px;
  margin-bottom: 25px;
`;
const UsersWrapper = styled.div`
  height: 450px;
  width: 100%;
  padding-right: 25px;
  overflow-y: auto;
  margin-top: 50px;
`;
const UserSearchWrapper = styled.div`
  height: 50px;
  width: 300px;
  display: flex;
  margin-top: 50px;
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
  height: 200px;
  width: 100%;
  display: flex;
  align-items: center;
`;
const ContactCard = styled.div`
  height: 100px;
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
  height: 70px;
  width: 70px;
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
const ButtonsWrapper = styled.div`
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 80px;
`;
const Button = styled.div`
  height: 60px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #9b84ee;
  cursor: pointer;
  transition: all 0.2s ease-in;
  color: #d3d3d3;
  &:hover {
    background: #9b84ee;
    color: black;
  }
`;
const LoadingWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NoChatsWrapper = styled(LoadingWrapper)`
  flex-direction: column;
`;
const NotFoundImage = styled.div`
  height: 150px;
  width: 150px;
  background: url("./notfound.svg");
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  margin-bottom: 50px;
`;
const EditGC = () => {
  const dispatch = useDispatch();
  const [showEditTab, setShowEditTab] = useState(false);
  const [usersArray, setUsersArray] = useState([]);
  const [selectedchat, setSelectedchat] = useState({});
  const [gcname, setGcname] = useState("");
  const [search, setSearch] = useState("");
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);
  const { loading: groupchatsLoading, chats: groupchats } = useSelector(
    (state) => state.groupchats
  );
  const { users } = useSelector((state) => state.allUsers);
  const openeditHandler = (chat) => {
    setGcname(chat.chatname);
    setShowEditTab(true);
    setSelectedchat(chat);
    let newArray = [];
    for (let i = 0; i < users.length; i++) {
      for (let j = 0; j < chat.members.length; j++) {
        if (users[i]._id === chat.members[j]) {
          newArray.push(users[i]);
        }
      }
    }
    setUsersArray(newArray);
  };
  const deleteChatHandler = (id) => {
    dispatch(deleteChat(id, true));
  };
  const updateGroupChatHandler = () => {
    dispatch(
      updateGroupChat(
        selectedchat._id,
        gcname,
        selectedchat.chatAvatar,
        usersArray
      )
    );
  };
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
  const addUserHandler = () => {
    if (Object.keys(result).length > 0) {
      const userExist = usersArray.find((item) => item._id === result._id);
      if (result._id) {
        if (userExist) {
          setResult({ name: "User Already Added" });
        } else {
          setUsersArray((prevArray) => [...prevArray, result]);
        }
      }
    } else {
      setResult({ name: "Search User First ! " });
    }
  };
  const removeUserHandler = (userId) => {
    const userExist = usersArray.find((item) => item._id === userId);
    if (userExist) {
      setUsersArray((prevArray) =>
        prevArray.filter((item) => item._id !== userId)
      );
    }
  };
  useEffect(() => {
    if (Object.keys(result).length > 0) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [result, groupchats]);

  return (
    <Wrapper>
      <AnimatePresence>
        {!showEditTab && (
          <Motion
            key="notshowedit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Header>Manage Groups ... </Header>
            <>
              {groupchatsLoading ? (
                <LoadingWrapper>
                  <Loader height="300px" width="300px"></Loader>
                </LoadingWrapper>
              ) : Object.keys(groupchats).length > 0 ? (
                <ChatsBlock>
                  {groupchats.map((item, index) => {
                    return (
                      <EditGCTab key={index}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Avatar image={item.chatAvatar} />
                          <Text>{item.chatname}</Text>
                        </div>
                        <TabButtons>
                          <FiEdit
                            size={24}
                            style={{ marginRight: "30px", cursor: "pointer" }}
                            onClick={() => openeditHandler(item)}
                          />
                          <MdDeleteOutline
                            size={24}
                            style={{ cursor: "pointer" }}
                            onClick={() => deleteChatHandler(item._id)}
                          />
                        </TabButtons>
                      </EditGCTab>
                    );
                  })}
                </ChatsBlock>
              ) : (
                <NoChatsWrapper>
                  <NotFoundImage />
                  <h1>No Chats Found !!</h1>
                </NoChatsWrapper>
              )}
            </>
          </Motion>
        )}
        {showEditTab && (
          <Motion
            key="showedit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EditBlock>
              <EditLeftBlock>
                <InputWrapper>
                  <InputBox
                    state={gcname}
                    changeHandler={setGcname}
                    placeholder="Name of the group ... "
                  />
                </InputWrapper>
                <UsersWrapper>
                  {usersArray.map((item, index) => {
                    return (
                      <EditGCTab key={index} isEdit={true}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Avatar image={item.image} />
                          <Text>{item.name}</Text>
                        </div>
                        <TabButtons>
                          <MdDeleteOutline
                            size={24}
                            style={{ cursor: "pointer" }}
                            onClick={() => removeUserHandler(item._id)}
                          />
                        </TabButtons>
                      </EditGCTab>
                    );
                  })}
                </UsersWrapper>
              </EditLeftBlock>
              <EditRightBlock>
                <h1>Search For Friend</h1>
                <UserSearchWrapper>
                  <InputBox
                    placeholder="Enter Friend's Name"
                    state={search}
                    type="text"
                    changeHandler={setSearch}
                  />
                  <SearchButton onClick={() => searchUser()}>
                    <AiOutlineSearch size={28} />
                  </SearchButton>
                </UserSearchWrapper>
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
                    ) : result.name === "Search User First ! " ? (
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
                <Button onClick={() => addUserHandler()}>
                  <p>Add User</p>
                </Button>
                <ButtonsWrapper>
                  <Button onClick={() => updateGroupChatHandler()}>
                    <p>Save Changes</p>
                  </Button>
                  <Button onClick={() => setShowEditTab(false)}>
                    <p>Cancel</p>
                  </Button>
                </ButtonsWrapper>
              </EditRightBlock>
            </EditBlock>
          </Motion>
        )}
      </AnimatePresence>
    </Wrapper>
  );
};

export default EditGC;
