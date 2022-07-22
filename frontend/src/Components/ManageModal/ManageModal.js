import React from "react";
import styled from "styled-components";
import { AiOutlineCloseSquare } from "react-icons/ai";
import ManageFriends from "./ManageFriends";
import ManageGC from "./ManageGC";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in;
  position: absolute;
  top: ${(props) => (props.open ? "0vh" : "100vh")};
  z-index: 5;
`;

const ModalBlock = styled.div`
  height: 75vh;
  width: 75vw;
  background: rgb(60, 60, 60);
`;

const CloseModal = styled.div`
  height: fit-content;
  width: fit-content;
  color: #9b84ee;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
`;

const ManageModal = ({
  openModal,
  setOpenModal,
  manageFriends,
  manageGC,
  friendsArray,
}) => {
  return (
    <Wrapper open={openModal}>
      <CloseModal onClick={() => setOpenModal(!openModal)}>
        <AiOutlineCloseSquare size={70}></AiOutlineCloseSquare>
      </CloseModal>
      <ModalBlock>
        {manageFriends && (
          <ManageFriends friendsArray={friendsArray}></ManageFriends>
        )}
        {manageGC && <ManageGC friendsArray={friendsArray}></ManageGC>}
      </ModalBlock>
    </Wrapper>
  );
};

export default ManageModal;
