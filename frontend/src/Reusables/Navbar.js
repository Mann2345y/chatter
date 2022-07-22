import React from "react";
import styled from "styled-components";
import logo from "./logo.png";

const Wrapper = styled.div`
  height: 100px;
  width: 100%;
  border-bottom: 1px solid #d3d3d3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;
const Logo = styled.img`
  height: 60px;
`;

const Navbar = () => {
  return (
    <Wrapper>
      <Logo src={logo} alt="#" />
    </Wrapper>
  );
};

export default Navbar;
