import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  height: 90vh;
  width: 90vw;
  position: absolute;
  background: rgb(45, 45, 45);
  top: ${(props) => (props.open ? "-100vh" : "5vh")};
  left: 5vw;
  box-shadow: rgba(50, 50, 50, 0.35) 0px 5px 15px;
  transition: all 0.2s ease-in;
`;

const Container = ({ children, openModal }) => {
  return <Wrapper open={openModal}>{children}</Wrapper>;
};

export default Container;
