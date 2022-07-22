import React, { useState } from "react";
import styled from "styled-components";
import {
  AiOutlineSearch as SearchIcon,
  AiOutlineUser as UserIcon,
  AiOutlineCloseSquare as CloseIcon,
} from "react-icons/ai";
import { BiDotsVerticalRounded as Menu } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { deleteChatMessages } from "../../../Redux/actions/messagesActions";

const Wrapper = styled.div`
  height: 60px;
  width: 100%;
  padding: 0 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgb(35, 35, 35);
  border-bottom: 1px solid rgb(80, 80, 80);
  border-left: 1px solid rgb(80, 80, 80);
`;
const UserBlock = styled.div`
  height: 40px;
  width: fit-content;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const UserImage = styled.div`
  height: 40px;
  width: 40px;
  background: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  border: 1px solid #d3d3d3;
  border-radius: 50%;
  margin-right: 15px;
`;
const SearchAndIconsBlock = styled.div`
  height: 100%;
  width: 350px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #d3d3d3;
  svg {
    cursor: pointer;
  }
`;
const Search = styled.div`
  height: 40px;
  width: 250px;
  display: flex;
  justify-content: simport { BiDotsVerticalRounded as Menu } from "react-icons/bi";
  pace-between;
  transition: all 0.2s ease-in;
  transform: ${(props) => (props.open ? "scaleY(1)" : "scaleY(0)")};
  transform-origin: top;
`;
const SearchInput = styled.input`
  height: 40px;
  width: 210px;
  padding: 0 15px;
  color: black;
  background: #9b84ee;
  border: none;
  font-size: 0.8em;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: black;
  }
`;
const CloseSearch = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: #9b84ee;
  color: black;
`;
const OptionsWrapper = styled.div`
  height: fit-content;
  width: fit-content;
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
  transition: all 0.2s ease-in;
  z-index: 2;
  &:hover div {
    transform: scaleY(1);
  }
`;
const MenuOptions = styled.div`
  height: 70px;
  width: 150px;
  background: #9b84ee;
  position: absolute;
  top: 45px;
  right: 0px;
  transform-origin: top;
  transform: scaleY(0);
  transition: all 0.2s ease-in;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  h5 {
    z-index: 1;
    color: black;
    transition: all 0.2s ease-in;
    &:hover {
      color: #d3d3d3;
    }
  }
  div {
    height: 95%;
    width: 100%;
    margin-top: 5%;
    background: white;
  }
`;
const ConversationHeader = ({ setOpenprofile }) => {
  const dispatch = useDispatch();
  const [opensearch, setOpensearch] = useState(false);
  const [searchphrase, setSearchphrase] = useState("");
  const { chat } = useSelector((state) => state.currentChat);
  const { user } = useSelector((state) => state.loggedUser);
  const { users } = useSelector((state) => state.allUsers);
  const Reciever = chat.members.find((item) => item !== user.id);
  const RecieverData = users.find((item) => item._id === Reciever);
  return (
    <Wrapper>
      <UserBlock>
        {chat.isGroupChat ? (
          <>
            <UserImage image={chat.chatAvatar} />
            <h4> {chat.chatname} </h4>
          </>
        ) : (
          <>
            <UserImage image={RecieverData.image} />
            <h4> {RecieverData.name} </h4>
          </>
        )}
      </UserBlock>
      <SearchAndIconsBlock>
        <Search open={opensearch}>
          <SearchInput
            placeholder="Search In Chat"
            value={searchphrase}
            onChange={(e) => setSearchphrase(e.target.value)}
          />
          <CloseSearch
            onClick={() => {
              setOpensearch(false);
              setSearchphrase("");
            }}
          >
            <CloseIcon size={24} />
          </CloseSearch>
        </Search>
        <SearchIcon
          size={24}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setOpensearch(!opensearch);
            setSearchphrase("");
          }}
          color="#9b84ee"
        />
        <OptionsWrapper>
          <Menu size={28} style={{ cursor: "pointer" }} color="#9b84ee" />
          <MenuOptions>
            <h5 onClick={() => setOpenprofile(true)}>Chat Profile</h5>
            <h5 onClick={() => dispatch(deleteChatMessages(chat._id))}>
              Clear Chat
            </h5>
          </MenuOptions>
        </OptionsWrapper>
      </SearchAndIconsBlock>
    </Wrapper>
  );
};

export default ConversationHeader;
