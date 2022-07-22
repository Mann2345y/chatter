import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineUser } from "react-icons/ai";
import { BiGroup } from "react-icons/bi";

const Wrapper = styled.div`
  height: 100%;
  width: 75px;
`;

const IconsWrapper = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
  color: ${(props) => (props.active ? "#9b84ee" : "#d3d3d3")};
  cursor: pointer;
  transition: all 0.2s ease-in;
`;

const Iconlabel = styled.p`
  font-size: 0.8em;
  margin-top: 10px;
`;

const SideBar = ({ setShowContacts, setShowGC, setOpenSlider }) => {
  const [userActive, setUserActive] = useState(true);
  const [groupActive, setGroupActive] = useState(false);

  const userHandler = () => {
    setUserActive(true);
    setGroupActive(false);
    setShowContacts(true);
    setShowGC(false);
    setOpenSlider(false);
  };

  const groupHandler = () => {
    setUserActive(false);
    setGroupActive(true);
    setShowContacts(false);
    setShowGC(true);
    setOpenSlider(false);
  };

  return (
    <Wrapper>
      <IconsWrapper active={userActive} onClick={userHandler}>
        <AiOutlineUser size={28} active={userActive.toString()} />
        <Iconlabel active={userActive}>Contacts</Iconlabel>
      </IconsWrapper>
      <IconsWrapper active={groupActive} onClick={groupHandler}>
        <BiGroup size={28} active={groupActive.toString()} />
        <Iconlabel active={groupActive}>Groups</Iconlabel>
      </IconsWrapper>
    </Wrapper>
  );
};

export default SideBar;
