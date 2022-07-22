import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RiUser3Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import { HiMail } from "react-icons/hi";
import styled from "styled-components";
import { updateUser } from "../../../Redux/actions/userActions";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Image = styled.div`
  height: 150px;
  width: 150px;
  background: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
  border: 1px solid black;
  border-radius: 50%;
`;
const InputWrapper = styled.div`
  height: 50px;
  width: 250px;
  background: rgb(30, 30, 30);
  border: 1px solid #9b84ee;
  display: flex;
  margin-top: 60px;
`;
const IconWrapper = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #9b84ee;
`;
const InputBar = styled.input`
  height: 50px;
  width: 200px;
  padding: 0 20px;
  font-size: 1em;
  color: white;
  background: transparent;
  border: 1px solid #9b84ee;
  transition: all 0.2s ease-in;
  &:focus {
    outline: none;
  }
  &:disabled {
    background: rgb(60, 60, 60);
  }
`;
const Buttons = styled.div`
  height: 50px;
  width: 150px;
  background: #9b84ee;
  border-radius: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #9b84ee;
  margin-top: 100px;
  transition: all 0.2s ease-in;
  color: black;
  cursor: pointer;
  &:hover {
    background: none;
    color: white;
  }
`;

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.loggedUser);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const updateUserHandler = () => {
    setToggleEdit(!toggleEdit);
    if (toggleEdit) {
      dispatch(updateUser(user.id, name, email));
    }
  };
  return (
    <Wrapper>
      <Image image={user.image} />
      <InputWrapper>
        <IconWrapper>
          <RiUser3Fill color="#9b84ee" size={25} />
        </IconWrapper>
        <InputBar
          disabled={!toggleEdit}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </InputWrapper>
      <InputWrapper>
        <IconWrapper>
          <HiMail color="#9b84ee" size={25} />
        </IconWrapper>
        <InputBar
          disabled={!toggleEdit}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputWrapper>
      <Buttons onClick={updateUserHandler}>
        {toggleEdit ? <p>Save Changes</p> : <p>Edit Profile</p>}
      </Buttons>
    </Wrapper>
  );
};

export default Profile;
